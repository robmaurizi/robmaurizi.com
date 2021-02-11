import React from 'react';

import '../styles/PostThumbnail.scss';


const PostThumbnail = ( {image, classes} ) => {

    if (!image) {
        return null;
    }

    const img = image.node;
    const className = `post-thumbnail ${classes}`

    return (
        <figure className={className}>
            <img src={img.sourceUrl} alt={img.alt} />
        </figure>
    )
}
export default PostThumbnail;