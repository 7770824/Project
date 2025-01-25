import React from 'react'
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={classes.item}>
                <h1>Categories</h1>
                <span>Women</span>
                <span>Men</span>
                <span>Shoes</span>
                <span>Accessories</span>
                <span>New Arrivals</span>
            </div>
            <div className={classes.item}>
                <h1>Links</h1>
                <span>FAQ</span>
                <span>Pages</span>
                <span>Stores</span>
                <span>Compare</span>
                <span>Cookies</span>
            </div>
        </div>
    )
}

export default Footer
