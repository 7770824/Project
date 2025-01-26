import React from 'react'
import classes from './Search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
const Search = ({ onSearch }) => {
    const searchHandler = (e) => {
        onSearch(prev => {
            return {
                ...prev,
                categories: e.target.value
            }
        })
    }
    return (
        <div className={classes.search}>
            <input className={classes.searchText} type='text' onChange={searchHandler}></input>
            <FontAwesomeIcon className={classes.icon} icon={faMagnifyingGlass} />
        </div>
    )
}

export default Search