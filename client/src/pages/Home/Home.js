import React, { useEffect, useState } from 'react'
import classes from './Home.module.css'
import Slider from '../../components/Slider/Slider'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Categories from '../../components/Categories/Categories'
import { useGetDataQuery } from '../../store/dataApi'

const Home = () => {
    const { data, isLoading, error } = useGetDataQuery();

    if (isLoading) return <div>加载中...</div>;
    if (error) return <div>错误: {error.message}</div>;
    if (!data) return null;

    return (
        <div className={classes.home}>
            <Slider />
            <FeaturedProducts type="Featured" data={data} />
            <Categories />
            <FeaturedProducts type="Trending" data={data} />
        </div>
    )
}

export default Home