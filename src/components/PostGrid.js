import React from 'react';
import PostCard from './PostCard';

const PostGrid = ( {data} ) => {

    return (
        <section className="section-container post-list">
            { data.map( item => {
                return <PostCard key={item.node.id} post={item.node} />
            })}
        </section>
    );

}

export default PostGrid;