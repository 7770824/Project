import React, { useState, useRef, useEffect } from 'react';
import classes from './ProductsList.module.css'
import Card from '../Card/Card';
import { useGetDataQuery } from '../../store/dataApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ProductsList = ({ filters }) => {
    const [page, setPage] = useState(1);
    const loaderRef = useRef(null);
    
    // 将过滤条件作为参数传递给API
    const { data, isLoading, isFetching, error } = useGetDataQuery({
        page,
        limit: 12,
        categories: filters.categories.length > 0 ? filters.categories.join(',') : undefined,
        symbol: filters.Symbol || undefined,
        kinds: filters.kinds || undefined,
        priceRange: filters.priceRange,
        sortBy: filters.sortBy
    });
    
    // 设置交叉观察器
    useEffect(() => {
        if (!data?.hasMore) return;
        
        const observer = new IntersectionObserver(
            entries => {
                const target = entries[0];
                if (target.isIntersecting && !isFetching && data.hasMore) {
                    // 当观察元素进入视口且还有更多商品待加载时，请求下一页
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 0.1 }
        );
        
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        
        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [data, isFetching]);
    
    // 当过滤条件变化时重置页码
    useEffect(() => {
        setPage(1);
    }, [filters]);
    
    if (isLoading && page === 1) return <div>加载中...</div>;
    if (error) return <div>错误: {error.message}</div>;
    if (!data) return null;
    
    return (
        <div className={classes.list}>
            {data.items.length > 0 ? (
                data.items.map(item => (
                    <Card key={item.id} item={item} />
                ))
            ) : (
                <div className={classes.noResults}>没有找到符合条件的商品</div>
            )}
            
            {data.hasMore && (
                <div ref={loaderRef} className={classes.loader}>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    <span>加载更多...</span>
                </div>
            )}
        </div>
    );
};

export default ProductsList;