import React, { useEffect, useState } from 'react'
import ProductImg from '../../components/ProductImg/ProductImg'
import ProductSrc from '../../components/ProductSrc/ProductSrc'
import classes from './Product.module.css'
import { useSearchParams } from 'react-router-dom'
import { useGetDataByIdQuery } from '../../store/dataApi'
const Product = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const { data, isLoading, error } = useGetDataByIdQuery(id);

    if (isLoading) return <div>加载中...</div>;
    if (error) return <div>错误: {error.message}</div>;
    if (!data) return null;

    return (
        <div className={classes.product}>
            <ProductImg img={[data.img1, data.img2]} />
            <ProductSrc data={data} />
        </div>
    )
}

export default Product