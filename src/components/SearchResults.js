import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import debounce from "lodash.debounce";
import ReactLoading from 'react-loading';

import ArchiveHeader from './archive/ArchiveHeader';
import PostGrid from './PostGrid';
import LoadingButton from './LoadingButton';
import PostTitle from './PostTitle';

import '../styles/PostList.scss';

const FEED_QUERY = gql`query PaginatedSearch($cursor: String, $search: String) {
    posts(first: 12, after: $cursor, where: {search: $search}) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          databaseId
          id
          title
          excerpt
          date
          slug
          uri
          featuredImage {
            node {
              id
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

const PostList = ( {term} ) => {

    // const { params: { term } } = match;

    const [cursor, setCursor] = useState('');
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const {loading, error, data, fetchMore } = useQuery(FEED_QUERY, {
      variables: {
        cursor: "",
        search: term
      }
    });

    useEffect( () => {
        document.title = 'Search Results | Hypertext Jockey';
    }, []);

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

      if ( data && data.posts ) {
        setCursor(data.posts.pageInfo.endCursor);
        setHasNextPage(data.posts.pageInfo.hasNextPage);
        setIsLoading(false);
        
      }
    }, [data] );

    if ( loading ) {
      return <ReactLoading className="main-loader" type="bubble" color="#222" />
    }

    if ( error ) {
      console.error(error);
      return <div></div>
    }

    const nextPage = () => {
      
      if ( hasNextPage ) {
        setIsLoading(true);
        fetchMore({
          variables: {
            cursor: cursor,
            search: term,
          }
        });

      }

    };


    const noResultsRenderer = () => {
        return (
            <section className="search-results no-results">
                <div className="not-found-content">
                    <PostTitle>No Results Found</PostTitle>
                    <p>There are no results for "{term}"</p>
                </div>
            </section>
        )
    }

    return (
        <>
            <ArchiveHeader type='search' title={ term } />
            { data.posts.edges.length > 0 
                ? <PostGrid data={data.posts.edges} />
                : noResultsRenderer()
            }
            <LoadingButton hasNextPage={hasNextPage} onNextPress={ nextPage } isLoading={isLoading} />
        </>
        
    );
};

export default PostList;