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

// 是否正在刷新令牌
let isRefreshing = false;
// 等待令牌刷新的请求队列
let failedRequestsQueue = [];

/**
 * 创建带队列控制和令牌刷新机制的fetchBaseQuery包装器
 * @param {Object} options - fetchBaseQuery的原始选项
 * @param {number} maxConcurrent - 最大并发请求数
 * @returns {Function} 包装后的查询函数
 */
export const createQueuedFetchBaseQuery = (options, maxConcurrent = 4) => {
    const baseQuery = fetchBaseQuery(options);
    const requestQueue = createRequestQueue(maxConcurrent);

    // 返回包装后的查询函数
    return async (args, api, extraOptions) => {
        // 将baseQuery调用包装到队列中
        const result = await requestQueue.enqueue(() => baseQuery(args, api, extraOptions));

        // 检查是否是令牌过期错误
        if (result.error && result.error.status === 401) {
            const originalRequest = { args, api, extraOptions };

            // 特殊处理令牌过期的情况
            if (result.error.data?.code === 'TOKEN_EXPIRED' && !args.url.includes('refresh')) {
                if (!isRefreshing) {
                    isRefreshing = true;

                    try {
                        // 尝试刷新令牌
                        const refreshResult = await baseQuery(
                            { url: 'user/refresh', method: 'POST' },
                            api,
                            extraOptions
                        );

                        if (refreshResult.data?.status === 'success') {
                            // 令牌刷新成功，重试所有失败的请求
                            failedRequestsQueue.forEach(({ resolve }) =>
                                resolve()
                            );
                            failedRequestsQueue = [];

                            // 重试当前请求
                            return await baseQuery(args, api, extraOptions);
                        } else {
                            // 令牌刷新失败，拒绝所有失败的请求
                            failedRequestsQueue.forEach(({ reject }) =>
                                reject(new Error('令牌刷新失败'))
                            );
                            failedRequestsQueue = [];
                        }
                    } catch (error) {
                        // 刷新过程出错
                        failedRequestsQueue.forEach(({ reject }) =>
                            reject(error)
                        );
                        failedRequestsQueue = [];
                    } finally {
                        isRefreshing = false;
                    }
                } else {
                    // 已有刷新请求正在进行中，将当前请求加入队列
                    return new Promise((resolve, reject) => {
                        failedRequestsQueue.push({
                            resolve: () => {
                                // 令牌刷新成功后重试
                                requestQueue.enqueue(() => baseQuery(args, api, extraOptions))
                                    .then(resolve)
                                    .catch(reject);
                            },
                            reject
                        });
                    });
                }
            }
        }

        return result;
    };
};
