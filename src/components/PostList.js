import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import debounce from "lodash.debounce";
import ReactLoading from 'react-loading';

import PostGrid from './PostGrid';
import LoadingButton from './LoadingButton';

import '../styles/PostList.scss';

const FEED_QUERY = gql`query PaginatedPosts($cursor: String) {
    posts(first: 12, after: $cursor) {
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

const PostList = () => {

    const [cursor, setCursor] = useState('');
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const {loading, error, data, fetchMore } = useQuery(FEED_QUERY, {
      variables: {
        cursor: ""
      }
    });

    useEffect( () => {
        document.title = 'Blog | Hypertext Jockey';
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
      return <ReactLoading className="main-loader" type="bubble" />
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
            cursor: cursor
          }
        });

      }

    };

    return (
        <>
          <PostGrid data={data.posts.edges} />
          <LoadingButton hasNextPage={hasNextPage} onNextPress={ nextPage } isLoading={isLoading} />
        </>
        
    );
};

export default PostList;