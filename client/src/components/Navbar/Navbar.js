import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faChevronDown, faCloud, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faUser } from '@fortawesome/free-regular-svg-icons'
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
                    <hr />
                    <div>
                        <Link to="/products/1">服饰</Link>
                    </div>
                    <hr />
                    <div>
                        <Link to="/products/2">日用</Link>
                    </div>
                    <hr />
                    <div>
                        <Link to="/products/3">食品</Link>
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
                        <FontAwesomeIcon icon={faMagnifyingGlass} /><hr />
                        <FontAwesomeIcon icon={faUser} /><hr />
                        <div className={classes.cartIcon} onClick={() => setopen(!open)}>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span>1</span>
                        </div>
                    </div>
                </div>
            </div>
            {open && <Cart />}
        </div >
    )
}

export default Navbar