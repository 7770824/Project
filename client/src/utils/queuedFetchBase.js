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

    // 返回包装后的查询函数
    return async (args, api, extraOptions) => {
        // 将baseQuery调用包装到队列中
        return requestQueue.enqueue(() => baseQuery(args, api, extraOptions));
    };
};
