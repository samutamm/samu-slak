import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux';

import MainLayout from './components/layouts/main-layout.jsx';
import Home from './components/home.jsx';
import Store from './store';

const routingMiddleware = routerMiddleware(browserHistory);

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer
});

const history = syncHistoryWithStore(browserHistory, Store);

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={UserIsAuthenticated(Home)} />
    </Route>
  </Router>
);
