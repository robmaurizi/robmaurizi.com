import React from 'react';

import '../styles/PostTitle.scss';

const PostTitle = ( {children} ) => {

    return (
        <h1 className="post-title">{children}</h1>
    );

}
export default PostTitle;