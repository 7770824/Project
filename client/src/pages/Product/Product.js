import React from 'react'
import ProductImg from '../../components/ProductImg/ProductImg'
import ProductSrc from '../../components/ProductSrc/ProductSrc'
import classes from './Product.module.css'
const Product = () => {
    return (
        <div className={classes.product}>
            <ProductImg />
            <ProductSrc />
        </div>
    )
}

export default Product