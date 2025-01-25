import React, { useEffect, useState } from 'react'
import classes from './Home.module.css'
import Slider from '../../components/Slider/Slider'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Categories from '../../components/Categories/Categories'

const Home = () => {
    const [data, setdata] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/data');
                const result = await response.json();
                setdata(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    if (data) return (
        <div className={classes.home}>
            <Slider />
            <FeaturedProducts type="Featured" data={data} />
            <Categories />
            <FeaturedProducts type="Trending" data={data} />
        </div>
    )
}

export default Home