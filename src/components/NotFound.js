import React from 'react';

import PostTitle from './PostTitle';
import SearchBox from './SearchBox';

import '../styles/NotFound.scss';

const NotFound = () => {

    return (
        
        <section className="not-found section-container">
            <div className="not-found-content">
                <PostTitle>404: Not Found</PostTitle>
                <p>Uh oh... The paage you're looking for can't seem to be found.</p>
                <p className="second-message">We've turned the place upside down, and still no luck.</p>
            </div>
            <div className="not-found-search">
                <p>Perhaps a search?</p>
                <SearchBox />
            </div>
        </section>
    );
}

export default NotFound;