import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import debounce from 'lodash.debounce';
import ReactLoading from 'react-loading';

import PostGrid from '../PostGrid';
import ArchiveHeader from './ArchiveHeader';
import LoadingButton from '../LoadingButton';

const FEED_QUERY = gql`query Category($name: ID!, $cursor: String) {
    category(id: $name, idType: SLUG) {
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
                sourceUrl
              }
            }
            categories {
              nodes {
                name
                uri
                slug
              }
            }
            tags {
              nodes {
                name
                uri
                slug
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

const Category = ( {match} ) => {

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
      if ( data && data.category.posts ) {
        setCursor(data.category.posts.pageInfo.endCursor);
        setHasNextPage(data.category.posts.pageInfo.hasNextPage);
        setIsLoading(false);
      }
    }, [data] );


    if ( loading ) {
      return <ReactLoading className="main-loader" type="bubbles" color="#222" />
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
        <ArchiveHeader type='category' title={ data.category.name } />
        <PostGrid data={data.category.posts.edges} />
        <LoadingButton hasNextPage={hasNextPage} isLoading={isLoading} onNextPress={nextPage} />
      </>

    )

}
export default Category;