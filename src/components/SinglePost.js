import React, {useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import ReactLoading from 'react-loading';

import PostThumbnail from './PostThumbnail';
import PostDate from './PostDate';
import PostMeta from './PostMeta';
import PostTitle from './PostTitle';

import '../styles/SinglePost.scss';

const POST_QUERY = gql`query Post( $name: ID!) {
    post(id: $name, idType: SLUG) {
        id
        title
        content
        date
        uri
        featuredImage {
            node {
              sourceUrl
              altText
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
  }`;

const SinglePost = ( {match } ) => {

    const { params: { postname } } = match;
    const vars = { "name": postname };

    const {loading, error, data} = useQuery( POST_QUERY, {variables: vars } );

    useEffect( () => {
      if ( data && data.post ) {
        document.title = `${data.post.title} | Hypertext Jockey`;
      }
    }, [data]);

    if ( loading ) {
      return <ReactLoading className="main-loader" type="bubbles" />
    }
    if ( error ) {
        console.error(error);
      return <div></div>
    }

    const post = data.post;

    return (
        <article className="post single-post section-container">
            <PostThumbnail image={post.featuredImage} classes="single-post-featured-image" />

            <div className="single-post-content">
              <PostTitle>{ post.title }</PostTitle>
              <div className="cms-content" dangerouslySetInnerHTML={{__html: post.content }}></div>

              <footer className="post-footer">
                <div className="post-byline">
                    <PostDate date={ post.date } useTime />
                </div>
                <div className="post-meta">
                    <PostMeta tags={post.tags} cats={post.categories} />
                </div>
              </footer>

            </div>

        </article>
    )
}
export default SinglePost;