import React, { useState } from 'react'
import classes from './Products.module.css'
import ProductsList from '../../components/ProductsList/ProductsList';
const Products = () => {
    const [maxPrice, setmaxPrice] = useState(2000);
    const [sort, setsort] = useState('normal');
    return (
        <div className={classes.products}>
            <div className={classes.left}>
                <div className={classes.filter}>
                    <h2>商品种类</h2>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='women' value='women' />
                        <label htmlFor="women">Women</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='men' value='men' />
                        <label htmlFor="men">Men</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='clothes' value='clothes' />
                        <label htmlFor="clothes">Clothes</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='trousers' value='trousers' />
                        <label htmlFor="trousers">Trousers</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='shoes' value='shoes' />
                        <label htmlFor="shoes">Shoes</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='undergarments' value='undergarments' />
                        <label htmlFor="undergarments">Undergarments</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='Fittings' value='fittings' />
                        <label htmlFor="fittings">Fittings</label>
                    </div>
                    <div className={classes.filterInput}>
                        <input type='checkbox' id='sports' value='sports' />
                        <label htmlFor="sports">Sports</label>
                    </div>
                </div>
                <div className={classes.filter}>
                    <h2>价格区间</h2>
                    <div className={classes.filterInput}>
                        <span>0</span>
                        <input type='range' min={0} max={2000} onChange={e => setmaxPrice(e.target.value)} />
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
                        onChange={e => setsort(e.target.value)}
                        checked={sort === 'normal'}
                    />
                    <label htmlFor='normal' className={classes.space}>综合</label>
                    <input
                        type='radio'
                        id='minfirst'
                        value='minfirst'
                        name='sort'
                        onChange={e => setsort(e.target.value)}
                        checked={sort === 'minfirst'}
                    />
                    <label htmlFor='minfirst'>价格从低到高</label>
                </div>
            </div>
            <div className={classes.right}>
                <ProductsList />
            </div>
        </div>
    )
}

export default Products