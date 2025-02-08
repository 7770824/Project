import React, { useState } from 'react'
import classes from './CartCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useChangeCartMutation } from '../../store/cartApi'

const CartCard = ({ item }) => {
    const [showChange, setShowChange] = useState(false);
    const [changeCart] = useChangeCartMutation();

    const minusHandler = async () => {
        // e.stopPropagation();
        try {
            await changeCart({ id: item.id, nums: item.nums - 1 });
        } catch (error) {
            console.error('操作失败');
        }
    };

    const addHandler = async () => {
        // e.stopPropagation();
        try {
            await changeCart({ id: item.id, nums: item.nums + 1 });
        } catch (error) {
            console.error('操作失败');
        }
    };

    if (item.nums > 0) return (
        <div className={classes.cartcard} onClick={() => setShowChange(false)}>
            <div className={classes.cartimg}>
                <img src={item.img} alt=''></img>
            </div>
            <div className={classes.cartsrc}>
                <h2>{item.name}</h2>
                <div>
                    <div className={classes.nums} onClick={e => e.stopPropagation()}>
                        {showChange &&
                            <button onClick={minusHandler}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        }
                        {!showChange &&
                            <span className={classes.iconX}>
                                <FontAwesomeIcon icon={faXmark} />
                            </span>
                        }
                        <span className={classes.number} onClick={() => setShowChange(true)}>
                            {item.nums}
                        </span>
                        {showChange &&
                            <button onClick={addHandler}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        }
                    </div>
                    <span>￥{item.price * item.nums}</span>
                </div>
            </div>
        </div>
    );
    return null;
};

export default CartCard;