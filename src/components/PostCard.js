import React from 'react';
import { Link } from 'react-router-dom';
import { Tween, Reveal } from 'react-gsap';

import PostThumbnail from './PostThumbnail';
import PostDate from './PostDate';
import PostTitle from './PostTitle';

import '../styles/PostCard.scss';

const PostCard = (props) => {
    const { post } = props;

    const className = post.featuredImage ? 'has-thumbnail' : '';

    return ( 

        <Reveal threshold={.25}>
            <Tween from={{y: '10px', opacity: 0}} duration={.3}>
                <article className={`post-card ${className}`}>
                    { post.featuredImage 
                        ? <Link to={`/blog${post.uri}`}><PostThumbnail image={post.featuredImage} classes="" /></Link>
                        : <div className="post-thumbnail"></div> 
                    }
                    
                    <PostTitle>
                        <Link to={`/blog${post.uri}`}>{post.title}</Link>
                    </PostTitle>

                    <div className="post-byline">
                        <PostDate date={post.date} />
                    </div>
                    <div className="post-excerpt" dangerouslySetInnerHTML={{__html: post.excerpt}} />
                </article>
            </Tween>
        </Reveal>
    );
};

export default PostCard;