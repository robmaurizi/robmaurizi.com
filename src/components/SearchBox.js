import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import '../styles/SearchBox.scss';

const SearchBox = ( {history} ) => {

    const [ searchTerm, setSearchTerm ] = useState('');

    const onSearchSubmit = ( e ) => {
        e.preventDefault();
        history.push(`/?s=${searchTerm}`);
    }

    return (
        
        <div className="search-box">
            <form onSubmit={ onSearchSubmit } method="get">
                <input className="search-input" placeholder="Search..." type="search" name="s" value={ searchTerm } onChange={ e => { setSearchTerm( e.target.value ) } } />
                <button className="search-submit" type="submit">Go</button>
            </form>
        </div>
    );
}

export default withRouter(SearchBox);