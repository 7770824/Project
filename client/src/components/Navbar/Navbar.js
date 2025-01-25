import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import classes from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import Cart from '../Cart/Cart'
const Navbar = () => {
    const [open, setopen] = useState(false);
    return (
        <div className={classes.navbar}>
            <div className={classes.wrapper}>
                <div className={classes.left}>
                    <div>
                        <img src="/img/R-C.png" alt=''></img>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div>
                        CN
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div>
                        <Link to="/products/1">Women</Link>
                    </div>
                    <div>
                        <Link to="/products/2">Men</Link>
                    </div>
                    <div>
                        <Link to="/products/3">Children</Link>
                    </div>
                </div>
                <div className={classes.center}>
                    <Link to="/">LAMASTORE</Link>
                </div>
                <div className={classes.right}>
                    <div>
                        <Link to="/">Homepage</Link>
                    </div>
                    <div>
                        <Link to="/">About</Link>
                    </div>
                    <div>
                        <Link to="/">Contact</Link>
                    </div>
                    <div>
                        <Link to="/">Stores</Link>
                    </div>
                    <div className={classes.icons}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <FontAwesomeIcon icon={faUser} />
                        <FontAwesomeIcon icon={faHeart} />
                        <div className={classes.cartIcon} onClick={() => setopen(!open)}>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span>1</span>
                        </div>
                    </div>
                </div>
            </div>
            {open && <Cart />}
        </div>
    )
}

export default Navbar