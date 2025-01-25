import React, { useState } from 'react'
import classes from './ProductSrc.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faWallet } from '@fortawesome/free-solid-svg-icons';

const ProductSrc = () => {
    const [nums, setnums] = useState(1);
    return (
        <div className={classes.productsrc}>
            <h1>商品名称</h1>
            <p>描述</p>
            <div className={classes.price}>¥199</div>
            <div className={classes.nums}>
                <button onClick={() => setnums(prev => prev > 1 ? prev - 1 : prev)}>-</button>
                {nums}
                <button onClick={() => setnums(prev => prev + 1)}>+</button>
            </div>
            <div className={classes.goStep}>
                <button className={classes.goCart}>
                    <FontAwesomeIcon icon={faCartPlus} />
                </button>
                <button className={classes.goBuy}>
                    <FontAwesomeIcon icon={faWallet} />
                </button>
            </div>

        </div>
    )
}

export default ProductSrc