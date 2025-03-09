import React from 'react'
import classes from './Home.module.css'
import Slider from '../../components/Slider/Slider'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Categories from '../../components/Categories/Categories'

const Home = () => {
    return (
        <div className={classes.home}>
            <Slider />
            <FeaturedProducts type="Featured" />
            <Categories />
            <FeaturedProducts type="Trending" />
        </div>
    )
}

export default Home