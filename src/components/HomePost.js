import React from 'react';
import { Link } from 'react-router-dom';

import PostThumbnail from './PostThumbnail';
import Eyebrow from './Eyebrow';

import '../styles/HomePost.scss';

const HomePost = ( {post} ) => {

    return (
        <section className="home-post section-container">
            { post.featuredImage 
                ? <PostThumbnail image={post.featuredImage} classes="home-post-featured" /> 
                : null 
            }
            <div className="home-post-content">
                <Eyebrow text="From the Blog" classes="home-post-eyebrow" />
                <h2 className="home-post-title"><Link to={`/blog${post.uri}`} dangerouslySetInnerHTML={{__html: post.title }}></Link></h2>
                <div className="home-post-excerpt" dangerouslySetInnerHTML={{__html: post.excerpt }}></div>
                <div className="home-post-link"><Link to={`/blog${post.uri}`}><span>Continue Reading</span> &rarr;</Link></div>
            </div>
        </section>
    )

}
export default HomePost;