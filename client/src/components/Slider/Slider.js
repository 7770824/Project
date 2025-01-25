import React, { useState } from 'react'
import classes from './Slider.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Slider = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const data = [

    ];
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? 1 : (prev) => prev - 1)
    };
    const nextSlide = () => {
        setCurrentSlide(currentSlide === 1 ? 0 : (prev) => prev + 1)
    };

    return (
        <div className={classes.slider}>
            <div className={classes.container} style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
                <img src='/img/1.jpg' alt=''></img>
                <img src='/img/2.jpg' alt=''></img>
            </div>
            <div className={classes.icons}>
                <div className={classes.icon} onClick={prevSlide}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className={classes.icon} onClick={nextSlide}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>
        </div>
    )
}

export default Slider