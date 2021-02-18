import React, {useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import ReactLoading from 'react-loading';

import ResumeSkill from './ResumeSkill';
import ResumeExperience from './ResumeExperience';

import '../styles/Resume.scss';

const RESUME_QUERY = gql`query Resume {
    page(id: "resume", idType: URI) {
      title
      slug
      resumeData {
        contactInfo
        education {
          description
          title
        }
        experience {
          company
          description
          endDate
          jobTitle
          location
          startDate
          skillsUsed {
              skill
              value
          }
        }
        profile
        skills {
          rating
          skill
        }
        workSamples {
          year
          url
          title
          description
        }
      }
    }
  }`;

const Resume = () => {

    const {loading, error, data} = useQuery( RESUME_QUERY );
  
    useEffect( () => {
        document.title = 'Resume | Hypertext Jockey';
    }, []);


    if ( loading ) {
        return <ReactLoading className="main-loader" type="bubbles" />
    }

    if ( error ) {
        console.error(error);
        return <div></div>
    }

    const resumeData = data.page.resumeData;

    window.onload = null;

    return (
        <article className="resume-container">


            <section className="resume-contact section-container">
                <h1 className="item-head">Rob Maurizi</h1>
                <div dangerouslySetInnerHTML={{__html: resumeData.contactInfo }} />
            </section>

            <section className="resume-profile section-container">
                <h2 className="section-head">Profile</h2>
                <div dangerouslySetInnerHTML={{__html: resumeData.profile }} />
            </section>

            <section className="resume-skills section-container">
                <h2 className="section-head">Skills</h2>
                <ul>
                    { resumeData.skills.map( (item, i) => {
                        return <li key={i}>
                            <ResumeSkill skill={item.skill} rating={item.rating} />
                        </li>
                    })}
                </ul>
            </section>            

            <section className="resume-experience section-container">
                <h2 className="section-head">Experience</h2>
                <ul>
                { resumeData.experience.map( (job, i) => {
                    return (
                        <li key={i}>
                            <ResumeExperience job={job} />
                        </li>
                    );
                })}
                </ul>
            </section>

            <section className="resume-samples section-container">
                <h2 className="section-head">Work Samples</h2>
                <ul>
                { resumeData.workSamples.map( (job, i) => {
                    return (
                        <li key={i}>
                            <h3 className="item-head">{ job.title }, { job.year }: <a href={job.url} target="_blank" rel="noreferrer">{ job.url }</a></h3>
                            <div className="job-description" dangerouslySetInnerHTML={{__html: job.description}} />
                        </li>
                    );
                })}
                </ul>
            </section>     
            
            <section className="resume-education section-container">
                <h2 className="section-head">Education</h2>    
                <ul>
                    { resumeData.education.map( (item, i) => {
                        return (
                            <li key={i}>
                                <h3 className="item-head">{ item.title }</h3>
                                <div className="item-description" dangerouslySetInnerHTML={{__html: item.description}} />
                            </li>
                        );
                    })}
                </ul>
            </section>   
{/* 

            <div className="resume-section">


            </div>

            <div className="resume-section">


                
            </div> */}
    

        </article>

    );

}
export default Resume;