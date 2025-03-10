import React from 'react'
import classes from './Search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

// 将 debounce 移到组件外部
const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};

const Search = ({ onSearch }) => {
    const searchHandler = debounce((e) => {
        const searchText = e.target.value;
        onSearch('searchText', searchText);
    }, 500);

    return (
        <div className={classes.search}>
            <input
                className={classes.searchText}
                type='text'
                onChange={searchHandler}
                placeholder="搜索商品..."
            />
            <FontAwesomeIcon className={classes.icon} icon={faMagnifyingGlass} />
        </div>
    )
}

export default Search