import React, { useEffect, useState } from 'react'
import classes from './Cart.module.css'
import CartCard from '../CartCard/CartCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
    const [data, setData] = useState(null);
    // 依赖数组[]说明:
    // 空数组表示只在组件首次渲染时执行
    // 不会在后续更新时重复执行
    // 避免无限循环请求

    // 如果不使用useEffect:
    // 直接发请求会导致无限循环
    // 组件更新→发请求→数据更新→组件更新→发请求...

    // 所以useEffect在这里主要用于:
    // 控制数据请求的时机
    // 避免重复请求
    // 确保只在组件挂载时获取一次数据
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/cart/read');
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);
    if (data) {
        let sum = 0;
        data.forEach(item => sum += item.price)
        return (
            <div className={classes.cart}>
                <h1>购物车</h1>
                <div className={classes.cartItems}>
                    {data.map(item => (
                        <CartCard item={item} />
                    ))}
                </div>

                <hr />

                {data.length !== 0 &&
                    <div className={classes.bottom}>
                        <h2>总价: ￥{sum}</h2>
                        <hr />
                        <button className={classes.goBuy}>
                            <FontAwesomeIcon icon={faWallet} />
                            <span>去结算</span>
                        </button>
                    </div>}
            </div>
        )
    }
}

export default Cart