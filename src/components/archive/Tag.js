import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import debounce from 'lodash.debounce';
import ReactLoading from 'react-loading';

import PostGrid from '../PostGrid';
import ArchiveHeader from './ArchiveHeader';
import LoadingButton from '../LoadingButton';


const FEED_QUERY = gql`query Tag($name: ID!, $cursor: String) {
    tag(id: $name, idType: SLUG) {
      posts(first: 12, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            excerpt
            date
            slug
            uri
            featuredImage {
              node {
                altText
                sourceUrl(size: MEDIUM_LARGE)
              }
            }
          }
        }
      }
      name
      link
      id
    }
  }
`;

const Tag = ( {match} ) => {

    const { params: { name } } = match;

    const [cursor, setCursor] = useState('');
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const {loading, error, data, fetchMore} = useQuery( FEED_QUERY, {
      variables: {
        name: name,
        cursor: ""
      } 
    });

    const scrollListener = debounce(() => {
      if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        nextPage();
      }
    }, 100);

    useEffect( () => {
      function watchScroll() {
        window.addEventListener('scroll', scrollListener);
      }
      watchScroll();
      return () => {
        window.removeEventListener('scroll', scrollListener);
      }
    });       

    useEffect( () => {
      if ( data && data.tag.posts ) {
        setCursor(data.tag.posts.pageInfo.endCursor);
        setHasNextPage(data.tag.posts.pageInfo.hasNextPage);
        setIsLoading(false);
      }
    }, [data] );


    if ( loading ) {
      return <ReactLoading className="main-loader" type="bubbles" />
    }

    if ( error ) {
        console.error(error);
        return <div></div>
    }

    const nextPage = () => {

      if ( hasNextPage) {

        setIsLoading(true);
        fetchMore({
          variables: {
            name: name,
            cursor: cursor
          }
        });

      }

    };

    return (
      <>
        <ArchiveHeader type='tag' title={ data.tag.name } />
        <PostGrid data={data.tag.posts.edges} />
        <LoadingButton hasNextPage={hasNextPage} isLoading={isLoading} onNextPress={nextPage} />
      </>

    )

}
export default Tag;