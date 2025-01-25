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
                        <img src='/dataImg/Fendi/3/2.jpg'></img>
                    </Link>
                </div>
                <div className={classes.rowsecond}>
                    <div className={classes.col}>
                        <div className={classes.rowfirst}>
                            <Link to="/">
                                <div className={classes.tag}>报喜鸟</div>
                                <img src='/dataImg/bird/3.jpg'></img>
                            </Link>
                        </div>
                    </div>
                    <div className={classes.col}>
                        <div className={classes.rowfirst}>
                            <Link to="/">
                                <div className={classes.tag}>老庙</div>
                                <img src='/dataImg/laomiao/1/2.jpg'></img>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.col}>
                <div className={classes.rowfirst}>
                    <Link to="/">
                        <div className={classes.tag}>IWC</div>
                        <img src='/dataImg/IWC/2/1.jpg'></img>
                    </Link>
                </div>
                <div className={classes.rowsecond}>
                    <div className={classes.col}>
                        <div className={classes.rowfirst}>
                            <Link to="/">
                                <div className={classes.tag}>传祺</div>
                                <img src='/dataImg/chuanqi/2.jpg'></img>
                            </Link>
                        </div>
                    </div>
                    <div className={classes.col}>
                        <div className={classes.rowfirst}>
                            <Link to="/">
                                <div className={classes.tag}>BELLE</div>
                                <img src='/dataImg/BELLE/3.jpg'></img>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories