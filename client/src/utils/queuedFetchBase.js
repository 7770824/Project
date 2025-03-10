import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * 创建一个请求队列管理器，用于控制并发请求数量
 * @param {number} maxConcurrent - 最大并发请求数
 * @returns {Object} 队列管理器对象
 */
const createRequestQueue = (maxConcurrent = 4) => {
    let activeRequests = 0;
    const pendingRequests = [];

    // 处理队列中的下一个请求
    const processNextRequest = () => {
        if (pendingRequests.length === 0 || activeRequests >= maxConcurrent) return;

        activeRequests++;
        const { request, resolve, reject } = pendingRequests.shift();

        // 执行请求
        request()
            .then(result => {
                activeRequests--;
                resolve(result);
                processNextRequest(); // 尝试处理下一个请求
            })
            .catch(error => {
                activeRequests--;
                reject(error);
                processNextRequest(); // 即使失败也尝试处理下一个请求
            });
    };

    // 将请求添加到队列
    const enqueue = (requestFn) => {
        return new Promise((resolve, reject) => {
            pendingRequests.push({
                request: requestFn,
                resolve,
                reject
            });

            processNextRequest(); // 尝试处理队列
        });
    };

    return { enqueue };
};

/**
 * 创建带队列控制的fetchBaseQuery包装器
 * @param {Object} options - fetchBaseQuery的原始选项
 * @param {number} maxConcurrent - 最大并发请求数
 * @returns {Function} 包装后的查询函数
 */
export const createQueuedFetchBaseQuery = (options, maxConcurrent = 4) => {
    const baseQuery = fetchBaseQuery(options);
    const requestQueue = createRequestQueue(maxConcurrent);

    // 跟踪是否正在刷新token
    let isRefreshing = false;
    // 等待令牌刷新的请求队列
    let refreshSubscribers = [];

    // 添加新订阅者
    const addSubscriber = (callback) => {
        refreshSubscribers.push(callback);
    };

    // 通知所有订阅者令牌已刷新
    const onRefreshed = () => {
        refreshSubscribers.forEach(callback => callback());
        refreshSubscribers = [];
    };

    // 返回包装后的查询函数
    return async (args, api, extraOptions) => {
        // 将baseQuery调用包装到队列中
        const result = await requestQueue.enqueue(async () => {
            const response = await baseQuery(args, api, extraOptions);

            // 如果是401错误且不是刷新令牌的请求
            if (response.error && response.error.status === 401 && !args.url.includes('/refresh')) {
                // 避免多个请求同时触发刷新
                if (!isRefreshing) {
                    isRefreshing = true;

                    try {
                        // 尝试刷新令牌
                        const refreshResult = await baseQuery({
                            url: '/api/user/refresh',
                            method: 'POST',
                        }, api, extraOptions);

                        isRefreshing = false;

                        if (!refreshResult.error) {
                            // 令牌刷新成功，通知所有等待的请求
                            onRefreshed();

                            // 重试原始请求
                            return await baseQuery(args, api, extraOptions);
                        }

                        // 刷新失败，可能需要重定向到登录页面
                        // 这里由前端的各自组件处理
                    } catch (refreshError) {
                        isRefreshing = false;
                        throw refreshError;
                    }
                } else {
                    // 如果已经在刷新，将当前请求加入等待队列
                    return new Promise((resolve) => {
                        addSubscriber(() => {
                            resolve(baseQuery(args, api, extraOptions));
                        });
                    });
                }
            }

            return response;
        });

        return result;
    }
};
