import React, { useEffect, useState } from 'react'
import classes from './Cart.module.css'
import CartCard from '../CartCard/CartCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
    const [data, setData] = useState(null);

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