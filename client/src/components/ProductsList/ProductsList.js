import React, { useMemo } from 'react';
import classes from './ProductsList.module.css'
import Card from '../Card/Card';
import { useGetDataQuery } from '../../store/dataApi';

const ProductsList = ({ filters }) => {
    const { data, isLoading, error } = useGetDataQuery();

    // useMemo 用于缓存计算结果,使用useMemo避免每次渲染都重新过滤数据
    const filteredData = useMemo(() => {
        if (!data) return [];
        return data.filter(item => {
            if (!item.name.includes(filters.categories) && !item.kinds.includes(filters.categories)) return false;
            if (filters.Symbol.length && item.Symbol !== filters.Symbol) return false;
            if (filters.kinds.length && item.kinds !== filters.kinds) return false; if (item.newprice > filters.priceRange) return false;
            return true;
        });
    }, [data, filters]);
    if (filters.sortBy === 'minfirst') {
        filteredData.sort((a, b) => a.newprice - b.newprice)
    }

    if (isLoading) return <div>加载中...</div>;
    if (error) return <div>错误: {error.message}</div>;
    if (!data) return null;
    return (
        <div className={classes.list}>
            {filteredData.map(item => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ProductsList;