import React from 'react'
import classes from './Cart.module.css'
import CartCard from '../CartCard/CartCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { useGetCartQuery, useChangeCartMutation } from '../../store/cartApi';

const Cart = () => {
    const { data, isLoading, error } = useGetCartQuery();
    const [updateCart] = useChangeCartMutation();

    const updateItemNums = async (id, newNums) => {
        try {
            await updateCart({ id, nums: newNums });
        } catch (err) {
            console.error('更新失败:', err);
        }
    };

    if (isLoading) return <div>加载中...</div>;
    if (error) return <div>错误: {error.message}</div>;
    if (!data) return <div>购物车是空的</div>;

    const sum = data.reduce((acc, item) => acc + item.price * item.nums, 0);

    return (
        <div className={classes.cart}>
            <h1>购物车</h1>
            <div className={classes.cartItems}>
                {data.map(item => (
                    <CartCard
                        item={item}
                        key={item.id}
                        onNumsChange={updateItemNums}
                    />
                ))}
            </div>

            <hr />

            {(data.length !== 0 && data.some(item => item.nums !== 0)) &&
                <div className={classes.bottom}>
                    <h2>总价: ￥{sum}</h2>
                    <hr />
                    <button className={classes.goBuy}>
                        <FontAwesomeIcon icon={faWallet} />
                        <span>去结算</span>
                    </button>
                </div>
            }
        </div>
    );
};

export default Cart;