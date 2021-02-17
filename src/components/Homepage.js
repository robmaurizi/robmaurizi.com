import React, {useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import ReactLoading from 'react-loading';

import HomeIntro from './HomeIntro';
import HomePost from './HomePost';

import '../styles/Homepage.scss';

const HOME_QUERY = gql`
query Home {
    page(id: "home", idType: URI) {
      title(format: RENDERED)
      content(format: RENDERED)
    }
    posts(first: 1) {
      edges {
        node {
          databaseId
          excerpt(format: RENDERED)
          featuredImage {
            node {
              altText
              id
              sourceUrl(size: MEDIUM_LARGE)
            }
          }
          id
          title(format: RENDERED)
          uri
        }
      }
    }
  }
`;

const Homepage = () => {

    const {loading, error, data} = useQuery(HOME_QUERY);

    useEffect( () => {
      document.title = 'Hypertext Jockey';
    }, []);


    if ( loading ) {
      return <ReactLoading className="main-loader" type="bubbles" />
    }
    if ( error ) {
        console.error(error);
        return <div></div>
    }

    window.onload = null;

    return (
        <>
            <HomeIntro content={data.page.content} />
            <HomePost post={data.posts.edges[0].node} />
        </>
    );
}
export default Homepage;