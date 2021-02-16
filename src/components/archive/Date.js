import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import debounce from 'lodash.debounce';
import ReactLoading from 'react-loading';

import PostGrid from '../PostGrid';
import ArchiveHeader from './ArchiveHeader';
import LoadingButton from '../LoadingButton';

const FEED_QUERY = gql`query DatePosts($cursor: String, $dateQuery: DateQueryInput) {
    posts(first: 12, where: {dateQuery: $dateQuery }, after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
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
  }
`;


const Date = ( {match} ) => {

    const { params: { year, month } } = match;
    let dateQuery = {}
    if ( year ) {
        dateQuery.year = parseInt(year);
    }
    if ( month ) {
        dateQuery.month = parseInt(month);
    }

    const [cursor, setCursor] = useState('');
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const {loading, error, data, fetchMore } = useQuery(FEED_QUERY, {
      variables: {
        cursor: "",
        dateQuery: dateQuery
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
      if ( data && data.posts ) {
        setCursor(data.posts.pageInfo.endCursor);
        setHasNextPage(data.posts.pageInfo.hasNextPage);
        setIsLoading(false);
      }
    }, [data] );

    if ( loading ) {
      return <ReactLoading className="main-loader" type="bubbles" />
    }
    if ( error ) {
      console.log(error);
      return <div></div>
    }


    const nextPage = () => {

      if ( hasNextPage) {
        
        setIsLoading(true);

        fetchMore({
          variables: {
            cursor: cursor,
            dateQuery: dateQuery
          }
        });
      }

    };

    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let dateArchiveTitle = month ? `${months[month-1]}, ${year}` : year;

    return (
        <>
            <ArchiveHeader type='date' title={ dateArchiveTitle } />
            <PostGrid data={data.posts.edges} />
            <LoadingButton hasNextPage={hasNextPage} isLoading={isLoading} onNextPress={nextPage} />
        </>
    );
};

export default Date;