import React, { useState } from 'react'
import classes from './ProductSrc.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMinus, faPlus, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useAddCartMutation } from '../../store/cartApi';
import { useNavigate } from 'react-router-dom';

const ProductSrc = ({ data }) => {
    const navigate = useNavigate();
    const [nums, setnums] = useState(1);
    const [addCart] = useAddCartMutation();

    const addToCartHandler = async () => {
        try {
            await addCart({
                id: data.id,
                nums: nums
            }).unwrap(); // 添加 unwrap() 来正确处理错误
        } catch (error) {
            console.error('添加失败！', error);
            // RTK Query 的错误对象中，状态码在 error.status 中
            if (error.status === 401) {
                navigate('/login');
            }

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