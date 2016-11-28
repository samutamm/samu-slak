import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux';

import MainLayout from './components/layouts/main-layout.jsx';
import MessagesLayout from './components/layouts/messages-layout.jsx';
import Home from './components/home.jsx';
import {LoginContainer} from './components/login.jsx';
import authReducer from './reducers/auth-reducer';
import channelsReducer from './reducers/channels-reducer';
import {requireAuthentication} from './components/AuthenticatedComponent.jsx';


const loggerMiddleware = createLogger()

const routingMiddleware = routerMiddleware(browserHistory);

const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  channels: channelsReducer
});

const store = createStore(
  reducer,
  applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
    routingMiddleware)
);


const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={MainLayout}>
        <Route path="/" component={requireAuthentication(Home)} />
        <Route path="/login" component={LoginContainer} />
      </Route>
      <Route path="/messages" component={requireAuthentication(MessagesLayout)} />
    </Router>
  </Provider>,
  document.getElementById('app')
);

export default history;
