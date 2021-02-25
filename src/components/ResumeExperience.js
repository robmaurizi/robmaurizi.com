import React from 'react';
import { Tween, Reveal } from 'react-gsap';

import DevIcon from './DevIcon';

import '../styles/ResumeExperience.scss';

const ResumeExperience = ( {job} ) => {

    // console.log(job);
    // console.log(job.skillsUsed);

    const skills = job.skillsUsed.slice().sort( (a, b) => (a.value > b.value) ? -1 : 1 );

    const renderSkills = () => {

        return skills.map( skill => {
            const width = `${skill.value}%`;

            return (
                <li style={{ width: width}} key={skill.skill} className={`job-skill job-skill-${skill.skill}`} data-value={skill.value} title={`${skill.skill} approximately ${skill.value}%`}>
                    <span className="job-skill-inner">
                        <DevIcon name={skill.skill} />
                    </span>
                </li>
            );
        });
    }

    const jobDates = () => {
        return (job.startDate !== job.endDate) ? job.startDate + "\u2013" + job.endDate : job.startDate;
    }

    return (
        <>
            <h3 className="item-head">{ job.jobTitle }, { job.company }, { job.location}; { jobDates() }</h3>
            <Reveal>
                <div className="job-skills">
                    <div className="job-skills-graph">
                        <Tween from={{width: '0%'}} to={{width: '100%'}} duration={1}><span className="job-skills-graph-bar"></span></Tween>
                    </div>
                    <ul className="job-skills-items">
                        { renderSkills() }
                    </ul>
                </div>
            </Reveal>
            <div className="job-description" dangerouslySetInnerHTML={{__html: job.description}} />
        </>

    );
}

export default ResumeExperience;