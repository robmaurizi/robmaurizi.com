import React from 'react';

import '../styles/ResumeSkill.scss';

const ResumeSkill = ( {skill, rating} ) => {
    return (
        <div className="resume-skill">
            <h3 className="resume-skill-title item-head">{skill}</h3>
            <span className="resume-skill-rating" data-rating={rating}>
                <span className="resume-skill-rating-text">{ rating } / 5</span>
                <span className="resume-skill-rating-graph">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
            </span>
        </div>
    );
};

export default ResumeSkill;