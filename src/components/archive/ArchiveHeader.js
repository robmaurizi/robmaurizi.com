import React from 'react';

import '../../styles/ArchiveHeader.scss';

const ArchiveHeader = ({title, type}) => {

    let titleString = '';
    switch(type) {
        case 'tag':
            titleString = `Tag Archive: ${title}`;
            break;
        case 'category':
            titleString = `Category Archive: ${title}`;
            break;
        case 'date':
            titleString = `Posts Dated ${title}`;
            break;
        case 'search':
            titleString = `Search Results for "${title}"`;
            break;

        default:
            titleString = 'Archive';
            break;
    }

    return (
        <h1 className="archive-header">{titleString}</h1>
    );
};
export default ArchiveHeader;