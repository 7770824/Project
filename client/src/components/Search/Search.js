import React, { useCallback } from 'react'
import classes from './Search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Search = ({ onSearch }) => {
    // 创建防抖函数
    const debounce = (fn, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        };
    };

    // 使用useCallback记忆防抖后的搜索处理函数
    const searchHandler = useCallback(
        debounce((e) => {
            onSearch(prev => ({
                ...prev,
                categories: e.target.value
            }));
        }, 500),
        []
    );

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