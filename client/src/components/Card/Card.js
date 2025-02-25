import React from 'react'
import classes from './Card.module.css'
import { Link } from 'react-router-dom'

const Card = ({ item, type }) => {
    return (

        <div className={classes.card}>
            <Link to={`/product/?id=${item.id}`}>
                <div className={classes.image}>
                    <img src={item.img1} alt='' />
                </div>
                <h2>{item.name}</h2>
                <div className={classes.prices}>
                    <h3>￥{item.oldprice}</h3>
                    <h3>{item.newprice}</h3>
                </div>
            </Link>
        </div>

    )
}

export default Card