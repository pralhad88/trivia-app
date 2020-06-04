import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import NotFoundPage from "../component/NotFoundPage";
import SplashScreen from "../screen/landingPage";
import Questions from "../component/questions";
import Summary from "../component/summary";

import history from '../utils/history';
  
const AppRouter = () => ( // created browser history for application and merged all togather.
  <Router history={history}>
    <div>
      <Switch>        
        <Route path="/" component={SplashScreen} exact={true} />
        <Route path="/quiz" component={Questions} />
        <Route path="/summary" component={Summary} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;