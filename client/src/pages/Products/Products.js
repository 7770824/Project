import React, { useState } from 'react'
import classes from './Products.module.css'
import ProductsList from '../../components/ProductsList/ProductsList';
const Products = () => {
    const [maxPrice, setmaxPrice] = useState(2000);
    const [sort, setsort] = useState('normal');
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],       // 商品
        priceRange: 2000,    // 价格范围
        sortBy: 'normal'     // 排序方式
    });

    const handleFilterChange = (filterType, value, checked) => {
        setSelectedFilters(prev => {
            if (filterType === 'categories') {
                return {
                    ...prev,
                    [filterType]: checked
                        ? [...prev[filterType], value]
                        : prev[filterType].filter(item => item !== value)
                };
            }
            return {
                ...prev,
                [filterType]: value
            };
        });
    };

    return (
        <div className={classes.products}>
            <div className={classes.left}>
                <div className={classes.filter}>
                    <h2>商品种类</h2>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='FENDI' value='FENDI' onChange={(e) => handleFilterChange('categories', e.target.value, e.target.checked)} />
                        <label htmlFor="FENDEI">Fendi</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='IWC' value='IWC' onChange={(e) => handleFilterChange('categories', e.target.value, e.target.checked)} />
                        <label htmlFor="iwc">IWC</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='bird' value='报喜鸟' onChange={(e) => handleFilterChange('categories', e.target.value, e.target.checked)} />
                        <label htmlFor="bird">报喜鸟</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='BELLE' value='BELLE' onChange={(e) => handleFilterChange('categories', e.target.value, e.target.checked)} />
                        <label htmlFor="BELLE">BELLE百丽</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='chuanqi' value='传祺' onChange={(e) => handleFilterChange('categories', e.target.value, e.target.checked)} />
                        <label htmlFor="chuanqi">传祺</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='daily' value='日用' onChange={(e) => handleFilterChange('categories', e.target.value, e.target.checked)} />
                        <label htmlFor="daily">日用</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='food' value='食品' onChange={(e) => handleFilterChange('categories', e.target.value, e.target.checked)} />
                        <label htmlFor="food">食品</label>
                    </div>
                </div>
                <div className={classes.filter}>
                    <h2>价格区间</h2>
                    <div className={classes.filterInput}>
                        <span>0</span>
                        <input type='range' min={0} max={2000} value={maxPrice} onChange={e => {
                            handleFilterChange('priceRange', e.target.value)
                            setmaxPrice(e.target.value)
                        }} />
                        <span>{maxPrice}</span>
                    </div>
                </div>
                <div className={classes.filter}>
                    <h2>排序方式</h2>
                    <input
                        type='radio'
                        id='normal'
                        value='normal'
                        name='sort'
                        onChange={e => {
                            handleFilterChange('sortBy', e.target.value)
                            setsort(e.target.value)
                        }}
                        checked={sort === 'normal'}
                    />
                    <label htmlFor='normal' className={classes.space}>综合</label>
                    <input
                        type='radio'
                        id='minfirst'
                        value='minfirst'
                        name='sort'
                        onChange={e => {
                            handleFilterChange('sortBy', e.target.value)
                            setsort(e.target.value)
                        }}
                        checked={sort === 'minfirst'}
                    />
                    <label htmlFor='minfirst'>价格从低到高</label>
                </div>
            </div>
            <div className={classes.right}>
                <ProductsList filters={selectedFilters} />
            </div>
        </div>
    )
}

export default Products