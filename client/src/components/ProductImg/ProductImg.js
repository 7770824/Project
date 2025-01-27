import React, { useState } from 'react'
import classes from './ProductImg.module.css'

const ProductImg = ({ img }) => {
    const [mainPic, setmainPic] = useState(0);
    return (
        <div className={classes.productImg}>
            <div className={classes.picBox}>
                <img src={img[mainPic]} alt='' />
            </div>

            <div className={classes.minipicBox}>
                {img.map((item, index) =>
                    <img src={item} key={index} alt='' onClick={() => setmainPic(index)} />
                )}
            </div>
        </div>
    )
}

export default ProductImg