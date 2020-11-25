import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {useDispatch} from "react-redux";
import { filterProfiles } from "../../actions/profiles";

import './header.scss';

const Header = () => {

    const [filterValue, setFilterValue] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(filterProfiles(filterValue));
    }, [filterValue])

    const filter = (event) => {
        setFilterValue(event.target.value);
    }
    return (
        <header className='header'>
            <div className='search-box'>
                <FontAwesomeIcon icon={faSearch} className='edit-button' />
                <input type="text" placeholder="Search.." value={filterValue} onChange={filter}/>
            </div>
        </header>
    );
}

export default Header;
