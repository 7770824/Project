import React from 'react'
import classes from './Categories.module.css'
import { Link } from 'react-router-dom'

const Categories = () => {
    return (
        <div className={classes.categories}>
            <div className={classes.col}>
                <div className={classes.row}>
                    <Link to="/">
                        <div className={classes.tag}>Clothes</div>
                        <img src='/img/shoes.jpg'></img>
                    </Link>

                </div>
                <div className={classes.row}>
                    <Link to="/">
                        <div className={classes.tag}>Trousers</div>
                        <img src='/img/shoes.jpg'></img>
                    </Link>

                </div>
            </div>
            <div className={classes.col}>
                <div className={classes.row}>
                    <Link to="/">
                        <div className={classes.tag}>shoes</div>
                        <img src='/img/shoes.jpg'></img>
                    </Link>

                </div>
            </div>
            <div className={classes.colLarge}>
                <div className={classes.row}>
                    <div className={classes.col}>
                        <div className={classes.row}>
                            <Link to="/">
                                <div className={classes.tag}>Undergarments</div>
                                <img src='/img/shoes.jpg'></img>
                            </Link>

                        </div>
                    </div>
                    <div className={classes.col}>
                        <div className={classes.row}>
                            <Link to="/">
                                <div className={classes.tag}>Fittings</div>
                                <img src='/img/shoes.jpg'></img>
                            </Link>

                        </div>
                    </div>
                </div>
                <div className={classes.row}>
                    <Link to="/">
                        <div className={classes.tag}>Sports</div>
                        <img src='/img/shoes.jpg'></img>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Categories