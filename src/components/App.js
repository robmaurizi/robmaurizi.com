import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { createBrowserHistory } from "history";

import PostList from './PostList';
import SinglePost from './SinglePost';
import Category from './archive/Category';
import Tag from './archive/Tag';
import Date from './archive/Date';
import Resume from './Resume';
import Masthead from './Masthead';
import Main from './Main';

import HomeLoader from './HomeLoader';

import NotFound from './NotFound';

class App extends Component {

  customHistory = createBrowserHistory();

  render() {
    return (
      <Router history={this.customHistory}>
        <Route render={({ location }) => (
          <>
            <Masthead />
            <TransitionGroup>
              <CSSTransition timeout={0} classNames='fade' key={location.key}>
                <Main>
                  <Switch location={location}>
                    <Route exact path="/" component={HomeLoader} />
                    <Route exact path="/resume" component={Resume} />
                    <Route exact path="/blog" component={PostList} />
                    <Route path="/blog/:year/:month/:day/:postname" component={SinglePost} />
                    <Route path="/blog/category/:name" component={Category} />
                    <Route path="/blog/tag/:name" component={Tag} />
                    <Route exact path="/blog/:year" component={Date} />
                    <Route exact path="/blog/:year/:month" component={Date} />
                    <Route exact path="/?s=:term" component={HomeLoader} />
                    <Route component={NotFound} />
                  </Switch>
                </Main>
              </CSSTransition>
            </TransitionGroup>
          </>
          )} />
      </Router>
    );
  }
}

export default App;