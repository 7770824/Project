import React, { useEffect, useState } from 'react'
import ProductImg from '../../components/ProductImg/ProductImg'
import ProductSrc from '../../components/ProductSrc/ProductSrc'
import classes from './Product.module.css'
import { useSearchParams } from 'react-router-dom'
const Product = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/api/data/product/${id}`);
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, [id]);
    if (data) return (
        <div className={classes.product}>
            <ProductImg img={[data.img1, data.img2]} />
            <ProductSrc data={data} />
        </div>
    )
}

export default Product