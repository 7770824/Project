import React from 'react'
import classes from './Cart.module.css'
import CartCard from '../CartCard/CartCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { useGetCartQuery, useChangeCartMutation } from '../../store/cartApi';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetCartQuery();
    React.useEffect(() => {
        if (error?.status === 401) {
            navigate('/login');
        }
    }, [error, navigate]);
    const [updateCart] = useChangeCartMutation();

    const updateItemNums = async (id, newNums) => {
        try {
            await updateCart({ id, nums: newNums });
        } catch (err) {
            console.error('更新失败:', err);
        }
    };

    if (isLoading) return <div>加载中...</div>;
    if (error) return null;
    if (!data) return <div>购物车是空的</div>;

    const sum = data.reduce((acc, item) => acc + item.price * item.nums, 0).toFixed(2);

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