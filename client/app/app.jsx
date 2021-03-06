import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux';

import MainLayout from './components/layouts/main-layout.jsx';
import MessagesLayout from './components/layouts/messages-layout.jsx';
import {LoginContainer} from './components/login.jsx';
import {NicknameContainer} from './components/chooseNickname.jsx';
import authReducer from './reducers/auth-reducer';
import channelsReducer from './reducers/channels-reducer';
import messagesReducer from './reducers/messages-reducer';
import registerReducer from './reducers/register-reducer';
import {requireAuthentication} from './components/AuthenticatedComponent.jsx';


const loggerMiddleware = createLogger()

const routingMiddleware = routerMiddleware(browserHistory);

const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  channels: channelsReducer,
  messages: messagesReducer,
  register: registerReducer
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
        <Redirect from="/" to="messages"/>
        <Route path="/login" component={LoginContainer} />
        <Route path="/register" component={NicknameContainer} />
      </Route>
      <Route path="/messages" component={requireAuthentication(MessagesLayout)} />
    </Router>
  </Provider>,
  document.getElementById('app')
);

export default history;
