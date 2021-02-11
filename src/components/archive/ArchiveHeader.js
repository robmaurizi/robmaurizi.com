import React from 'react';

import '../../styles/ArchiveHeader.scss';

const ArchiveHeader = ({title, type}) => {

    let titleString = '';
    switch(type) {
        case 'tag':
            titleString = 'Tag Archive:';
            break;
        case 'category':
            titleString = 'Category Archive:';
            break;
        case 'date':
            titleString = 'Posts Dated';
            break;

        default:
            titleString = 'Archive';
            break;
    }

    return (
        <h1 className="archive-header">{titleString} {title}</h1>
    );
};
export default ArchiveHeader;