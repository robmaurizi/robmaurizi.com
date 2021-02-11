import React from 'react';
import { Link, NavLink} from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import '../styles/Masthead.scss';

const MASTHEAD_QUERY = gql`
query Settings {
    generalSettings {
      title
      description
    }
    menus {
      nodes {
        menuItems {
          nodes {
            label
            path
          }
        }
      }
    }
}`
  

const Masthead = () => {

    const {loading, error, data} = useQuery(MASTHEAD_QUERY);

    if ( loading ) {
        return '';
    }
    if ( error ) {
      console.error( error );
      return '';
    }

    return (
        <header className="masthead page-container">
            <div className="site-branding">
                <h1 className="site-title"><Link to="/">{ data.generalSettings.title }</Link></h1>
                <p className="site-description" dangerouslySetInnerHTML={{ __html: data.generalSettings.description }}></p>
            </div>

            <nav className="site-navigation">
                {/* <button className={`site-navigation-toggle toggled-${menuVisible}`} onClick={toggleMenu}>{ menuVisible ? `Hide Menu` : `Show Menu` }</button> */}
                <ul className="menu site-navigation-menu">
                { data.menus.nodes[0].menuItems.nodes.map( (menuItem, i) => {
                    if ( menuItem.path !== '/blog' ) {
                      return <li key={i} className="menu-item"><NavLink exact activeClassName="is-active" to={menuItem.path}>{menuItem.label}</NavLink></li>
                    } else {
                      return <li key={i} className="menu-item"><NavLink activeClassName="is-active" to={menuItem.path}>{menuItem.label}</NavLink></li>
                    }
                })}
                {/* static nav until dynamic nav is ready */}
                {/* <li className="menu-item"><NavLink activeClassName="is-active" to="/blog">Blog</NavLink></li> */}
                {/* <li className="menu-item"><NavLink activeClassName="is-active" to="/about">About</NavLink></li> */}
                {/* <li className="menu-item"><NavLink activeClassName="is-active" to="/resume">Resume</NavLink></li> */}
                </ul>
            </nav>
        </header>
    )

}
export default Masthead;