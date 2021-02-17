import React from 'react';
import { Tween, Reveal } from 'react-gsap';

import '../styles/ResumeSkill.scss';

const ResumeSkill = ( {skill, rating} ) => {

    const tweenEnd = `${rating * (100/5)}%`;

    return (
        <div className="resume-skill" title={`${skill}: ${ rating } / 5`}>
            <h3 className="resume-skill-title item-head">{skill}</h3>
            <span className="resume-skill-rating" data-rating={rating}>
                <span className="resume-skill-rating-text">{ rating } / 5</span>
                <span className="resume-skill-rating-graph">
                    <Reveal><Tween from={{width: 0}} to={{ width: tweenEnd}} duration={1} delay={0.5}><i></i></Tween></Reveal>
                </span>
            </span>
        </div>
    );
};

export default ResumeSkill;