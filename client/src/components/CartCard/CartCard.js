import React, { useState } from 'react'
import classes from './CartCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
const CartCard = ({ item }) => {
    const [showChange, setShowChange] = useState(false)
    const [nums, setNums] = useState(item.nums)
    const minusHandler = async () => {
        setNums(prev => prev - 1)
        try {
            const response = await fetch('http://localhost:5000/api/cartNumsChange', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: item.id,
                    nums: nums - 1 > 0 ? nums - 1 : 0
                })
            })
        } catch (error) {
            console.error('操作失败')
        }
    }
    const addHandler = async () => {
        setNums(prev => prev + 1)
        try {
            const response = await fetch('http://localhost:5000/api/cartNumsChange', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: item.id,
                    nums: nums + 1
                })
            })
        } catch (error) {
            console.error('操作失败')
        }
    }
    if (nums > 0) return (
        <div className={classes.cartcard} onClick={() => setShowChange(false)}>
            <div className={classes.cartimg}>
                <img src={item.img} alt=''></img>
            </div>
            <div className={classes.cartsrc}>
                <h2>{item.name}</h2>
                <div>
                    <div className={classes.nums} onClick={e => e.stopPropagation()}>
                        {showChange && <button onClick={minusHandler}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>}
                        {!showChange && <span className={classes.iconX}><FontAwesomeIcon icon={faXmark} /></span>}
                        <span className={classes.number} onClick={() => setShowChange(true)}>{nums}</span>
                        {showChange && <button onClick={addHandler}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>}
                    </div>

                    <span>￥{item.price * item.nums}</span>
                </div>

            </div>
        </div>
    )
}

export default CartCard