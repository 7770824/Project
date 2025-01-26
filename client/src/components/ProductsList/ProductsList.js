import React, { useState, useEffect, useMemo } from 'react';
import classes from './ProductsList.module.css'
import Card from '../Card/Card';

const ProductsList = ({ filters }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/data');
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);
    const filteredData = useMemo(() => {
        if (!data) return [];

        return data.filter(item => {
            if (!item.name.includes(filters.categories) && !item.kinds.includes(filters.categories)) return false;
            if (filters.Symbol.length && item.Symbol !== filters.Symbol) return false;
            if (filters.kinds.length && item.kinds !== filters.kinds) return false; if (item.newprice > filters.priceRange) return false;
            return true;
        });
    }, [data, filters]);
    if (filters.sortBy === 'minfirst') {
        filteredData.sort((a, b) => a.newprice - b.newprice)
    }
    return (
        <div className={classes.list}>
            {filteredData.map(item => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ProductsList;