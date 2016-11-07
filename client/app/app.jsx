import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux';

import MainLayout from './components/layouts/main-layout.jsx';
import Home from './components/home.jsx';
import userReducer from './reducers/userReducer';
import reducers from './reducers';

const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  reducers,
  applyMiddleware(routingMiddleware)
);

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer
});

const history = syncHistoryWithStore(browserHistory, store);

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={MainLayout}>
        <Route path="/" component={UserIsAuthenticated(Home)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
