import React from 'react';

const PostDate = ( {date, useTime} ) => {

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (useTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }

    const pubDate = new Date( date ).toLocaleString( 'en-US', options );

    return (
        <span className="post-date">Published <strong>{ pubDate }</strong></span>
    );
};

PostDate.defaultProps = {
    useTime: false
}
export default PostDate;