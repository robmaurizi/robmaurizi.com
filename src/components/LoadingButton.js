import React from 'react';
import ReactLoading from 'react-loading';

const LoadingButton = ( {hasNextPage, isLoading, onNextPress} ) => {

    if ( hasNextPage) {
        if ( !isLoading ) {
          return <button className="posts-load-more" onClick={onNextPress}>Load More</button>
        } else {
          return <ReactLoading className="posts-loading" type="bubbles" />; 
        }
    }

    return null;


}
export default LoadingButton;