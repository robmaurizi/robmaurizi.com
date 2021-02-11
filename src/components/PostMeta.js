import React from 'react';
import {Link} from 'react-router-dom';

const PostMeta = ( {cats, tags} ) => {

    const renderList = ( tax, title ) => {
        if ( !tax ) return;
        if ( !tax.nodes.length) return;
        
        const theList = tax.nodes.map( (item, i) => {
            if ( i < tax.nodes.length - 1 ) {
                return <span key={item.slug}><Link to={`/blog${item.uri}`}>{ item.name }</Link>, </span>
            } else {
                return <span key={item.slug}><Link to={`/blog${item.uri}`}>{ item.name }</Link></span>
            }
        });

        return (
            <div className={`post-meta-list post-meta-list-${title}`}><strong>{ title }</strong> { theList }</div>
        );

    };

    return (
        <>
            { cats
                ? renderList(cats, 'Categorized')
                : null
            }
            { tags
                ? renderList(tags, 'Tagged')
                : null
            }
        </>
    )
};
export default PostMeta;