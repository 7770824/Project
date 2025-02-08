import React from 'react'
import classes from './Products.module.css'
import ProductsList from '../../components/ProductsList/ProductsList';
import { useSearchParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import { useFilters } from '../../hooks/useFilters';
const Products = () => {
    const [searchParams] = useSearchParams();
    const { filters, handleFilterChange } = useFilters(searchParams);


    return (
        <div className={classes.products}>
            <div className={classes.search}>
                <Search onSearch={handleFilterChange} />
            </div>
            <div className={classes.main}>
                <div className={classes.left}>
                    <div className={classes.filter}>
                        <h2>商品种类</h2>
                        {['FENDI', 'IWC', '报喜鸟', 'BELLE', '传祺', '日用', '食品'].map(category => (
                            <div className={classes.filterInput}>
                                <input
                                    type='checkbox'
                                    id={category}
                                    value={category}
                                    onChange={(e) => handleFilterChange('categories', e.target.value, e.target.checked)}
                                />
                                <label htmlFor={category}>{category}</label>
                            </div>
                        ))}
                    </div>
                    <div className={classes.filter}>
                        <h2>价格区间</h2>
                        <div className={classes.filterInput}>
                            <span>0</span>
                            <input type='range' min={0} max={2000} value={filters.priceRange} onChange={e => {
                                handleFilterChange('priceRange', e.target.value)
                            }} />
                            <span>{filters.priceRange}</span>
                        </div>
                    </div>
                    <div className={classes.filter}>
                        <h2>排序方式</h2>
                        {['normal', 'minfirst'].map(sortType => (
                            <React.Fragment key={sortType}>
                                <input
                                    type='radio'
                                    id={sortType}
                                    value={sortType}
                                    name='sort'
                                    onChange={e => {
                                        handleFilterChange('sortBy', e.target.value)
                                    }}
                                    checked={filters.sortBy === sortType}
                                />
                                <label
                                    htmlFor={sortType}
                                    className={sortType === 'normal' ? classes.space : undefined}
                                >
                                    {sortType === 'normal' ? '综合' : '价格从低到高'}
                                </label>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className={classes.right}>
                    <ProductsList filters={filters} />
                </div>
            </div>
        </div>
    )
}

export default Products