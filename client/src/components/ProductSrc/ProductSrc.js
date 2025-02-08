import React, { useState } from 'react'
import classes from './ProductSrc.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMinus, faPlus, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useAddCartMutation } from '../../store/cartApi';

const ProductSrc = ({ data }) => {
    const [nums, setnums] = useState(1);
    const [addCart] = useAddCartMutation();
    const addToCartHandler = async () => {
        try {
            await addCart({ id: data.id, nums: nums });
        } catch (error) {
            console.error('添加失败！');
        }
    }
    return (
        <div className={classes.productsrc}>
            <h1>{data.name}</h1>
            <div className={classes.price}>¥{data.newprice}</div>
            <div className={classes.nums}>
                <button onClick={() => setnums(prev => prev > 1 ? prev - 1 : prev)}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{nums}</span>
                <button onClick={() => setnums(prev => prev + 1)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className={classes.goStep}>
                <button className={classes.goCart} onClick={addToCartHandler} >
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