import React from 'react';
import classes from "./FeaturedProuducts.module.css";
import Card from '../Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FeaturedProducts = (props) => {
    const data = props.data;
    // console.log(data)
    return (
        <div className={classes.featuredProducts}>
            <div className={classes.top}>
                <h1>{props.type} products</h1>
                <div>
                    <Link to="/">
                        More
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>

                </div>

            </div>
            <div className={classes.products}>
                {data.filter(item => item.Symbol === props.type)
                    .slice(0, 5)
                    .map(item => (
                        <Card item={item} key={item.id} type={props.type} />
                    ))}
            </div>
        </div>
    );
}

export default FeaturedProducts;