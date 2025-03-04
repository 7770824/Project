import React, { useMemo } from 'react';
import classes from "./FeaturedProuducts.module.css";
import Card from '../Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useGetDataQuery } from '../../store/dataApi';

const FeaturedProducts = (props) => {
    // 请求第一页所有数据，显示时会进行过滤
    const { data, isLoading, error } = useGetDataQuery({ page: 1, limit: 20 });

    // 筛选符合类型的商品
    const filteredData = useMemo(() => {
        if (!data?.items) return [];
        return data.items.filter(item => item.Symbol === props.type).slice(0, 5);
    }, [data, props.type]);

    if (isLoading) return <div>加载中...</div>;
    if (error) return <div>错误: {error.message}</div>;

    return (
        <div className={classes.featuredProducts}>
            <div className={classes.top}>
                <h1>{props.type} products</h1>
                <div>
                    <Link to={`/products?type=${props.type}`}>
                        More
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                </div>
            </div>
            <div className={classes.products}>
                {filteredData.map(item => (
                    <Card item={item} key={item.id} />
                ))}
            </div>
        </div>
    );
}

export default FeaturedProducts;