import React from 'react'
import classes from './Card.css'
import { Link } from 'react-router-dom'

const Card = (props) => {
    return (
        <Link to={`/product/${props.key}`}>
            <div>
                <div className={classes.image}>
                    {props.item.isNew && <span>New Season</span>}
                    <img src={props.item.img} alt='' />
                </div>
                <h2>{props.item.title}</h2>
                <div className={classes.prices}>
                    <h3>${props.item.oldprice}</h3>
                    <h3>${props.item.newprice}</h3>
                </div>
            </div>
        </Link>
    )
}

export default Card