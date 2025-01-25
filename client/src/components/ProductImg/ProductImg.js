import React, { useState } from 'react'
import classes from './ProductImg.module.css'

const ProductImg = () => {
    const images = [
        '/img/1.jpg',
        '/img/2.jpg'
    ]
    const [mainPic, setmainPic] = useState(0);
    return (
        <div className={classes.productImg}>
            <div className={classes.picBox}>
                <img src={images[mainPic]} alt='' />
            </div>

            <div className={classes.minipicBox}>
                {images.map((item, index) =>
                    <img src={item} key={index} alt='' onClick={() => setmainPic(index)} />
                )}
            </div>
        </div>
    )
}

export default ProductImg