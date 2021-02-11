import React from 'react';

import '../styles/Eyebrow.scss';

const Eyebrow = ({text, classes}) => {
    return (
        <div className={`eyebrow ${classes}`}>{text}</div>
    );
};

Eyebrow.defaultProps = {
    classes: ''
};
export default Eyebrow;