import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faChevronDown, faCloud, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faUser } from '@fortawesome/free-regular-svg-icons'
import classes from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import Cart from '../Cart/Cart'
import Userbox from '../Userbox/Userbox'
const Navbar = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
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
                    <hr />
                    <div>
                        <Link to="/products/?kinds=服饰">服饰</Link>
                    </div>
                    <hr />
                    <div>
                        <Link to="/products/?kinds=日用">日用</Link>
                    </div>
                    <hr />
                    <div>
                        <Link to="/products/?kinds=食品">食品</Link>
                    </div>
                </div>
                <div className={classes.center}>
                    <Link to="/">CLOUD</Link>
                    <FontAwesomeIcon icon={faCloud} />
                </div>
                <div className={classes.right}>
                    <div>
                        <Link to="/">首页</Link>
                    </div>
                    <hr />
                    <div>
                        <Link to="/products">ALL</Link>
                    </div>
                    <hr />
                    <div className={classes.icons}>
                        <div className={classes.userIcon} onClick={() => setUserOpen(!userOpen)}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <hr />
                        <div className={classes.cartIcon} onClick={() => setCartOpen(!cartOpen)}>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                    </div>
                </div>
            </div>
            {cartOpen && <Cart />}
            {userOpen && <Userbox />}
        </div >
    )
}

export default Navbar