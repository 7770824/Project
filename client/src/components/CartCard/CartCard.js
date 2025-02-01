import React, { useReducer } from 'react'
import classes from './CartCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

const ACTIONS = {
    SHOW_CONTROLS: 'SHOW_CONTROLS',
    HIDE_CONTROLS: 'HIDE_CONTROLS',
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    SET_ERROR: 'SET_ERROR'
};

const initialState = {
    showChange: false,
    nums: 0,
    error: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SHOW_CONTROLS:
            return { ...state, showChange: true };
        case ACTIONS.HIDE_CONTROLS:
            return { ...state, showChange: false };
        case ACTIONS.INCREMENT:
            return { ...state, nums: state.nums + 1 };
        case ACTIONS.DECREMENT:
            return { ...state, nums: Math.max(0, state.nums - 1) };
        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const CartCard = ({ item }) => {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        nums: item.nums
    });

    const updateCart = async (newNums) => {
        try {
            await fetch('http://localhost:5000/api/cartNumsChange', {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify({ id: item.id, nums: newNums })
            });
        } catch (error) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: '操作失败' });
        }
    };

    const minusHandler = async () => {
        dispatch({ type: ACTIONS.DECREMENT });
        await updateCart(state.nums - 1);
    };

    const addHandler = async () => {
        dispatch({ type: ACTIONS.INCREMENT });
        await updateCart(state.nums + 1);
    };

    if (state.nums > 0) return (
        <div className={classes.cartcard}
            onClick={() => dispatch({ type: ACTIONS.HIDE_CONTROLS })}>
            <div className={classes.cartimg}>
                <img src={item.img} alt=''></img>
            </div>
            <div className={classes.cartsrc}>
                <h2>{item.name}</h2>
                <div>
                    <div className={classes.nums} onClick={e => e.stopPropagation()}>
                        {state.showChange &&
                            <button onClick={minusHandler}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        }
                        {!state.showChange &&
                            <span className={classes.iconX}>
                                <FontAwesomeIcon icon={faXmark} />
                            </span>
                        }
                        <span className={classes.number}
                            onClick={() => dispatch({ type: ACTIONS.SHOW_CONTROLS })}>
                            {state.nums}
                        </span>
                        {state.showChange &&
                            <button onClick={addHandler}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        }
                    </div>
                    <span>￥{item.price * state.nums}</span>
                </div>
            </div>
            {state.error && <div className={classes.error}>{state.error}</div>}
        </div>
    );
    return null;
};

export default CartCard;