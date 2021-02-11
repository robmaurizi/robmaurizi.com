import React from 'react';

import '../styles/HomeIntro.scss';

const HomeIntro = ( {content} ) => {

    return (
        <section className="home-intro section-container">
            <div dangerouslySetInnerHTML={{__html: content }} />
        </section>
    );
};

export default HomeIntro;