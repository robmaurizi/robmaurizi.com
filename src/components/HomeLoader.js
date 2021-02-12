import React from 'react';
import Homepage from './Homepage';
import SearchResults from './SearchResults';

const HomeLoader = ( {location} ) => {

    const search = new URLSearchParams(location.search);
    const term = search.get('s');
    
    return (
        term 
            ? <SearchResults term={term} /> 
            : <Homepage />
    );

}
export default HomeLoader;