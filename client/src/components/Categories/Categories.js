import React from 'react'
import classes from './Categories.module.css'
import { Link } from 'react-router-dom'

const Categories = () => {
    return (
        <div className={classes.categories}>
            <div className={classes.col}>
                <div className={classes.rowfirst}>
                    <Link to="/">
                        <div className={classes.tag}>Findi</div>
                        <img src='/img/shoes.jpg'></img>
                    </Link>
                </div>
                <div className={classes.rowsecond}>
                    <div className={classes.col}>
                        <div className={classes.rowfirst}>
                            <Link to="/">
                                <div className={classes.tag}>报喜鸟</div>
                                <img src='/img/shoes.jpg'></img>
                            </Link>
                        </div>
                    </div>
                    <div className={classes.col}>
                        <div className={classes.rowfirst}>
                            <Link to="/">
                                <div className={classes.tag}>老庙</div>
                                <img src='/img/shoes.jpg'></img>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.col}>
                <div className={classes.rowfirst}>
                    <Link to="/">
                        <div className={classes.tag}>BELLE</div>
                        <img src='/img/shoes.jpg'></img>
                    </Link>
                </div>
                <div className={classes.rowsecond}>
                    <div className={classes.col}>
                        <div className={classes.rowfirst}>
                            <Link to="/">
                                <div className={classes.tag}>传祺</div>
                                <img src='/img/shoes.jpg'></img>
                            </Link>
                        </div>
                    </div>
                    <div className={classes.col}>
                        <div className={classes.rowfirst}>
                            <Link to="/">
                                <div className={classes.tag}>BELLE</div>
                                <img src='/img/shoes.jpg'></img>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories