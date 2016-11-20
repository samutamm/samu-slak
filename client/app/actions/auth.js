import {Map} from 'immutable';
import axios from 'axios';
import { browserHistory } from 'react-router';

function request() {
  return {
    type: 'REQUEST'
  };
}

export function receiveToken(redirect, token) {
  localStorage.setItem('token', token);
  return {
    type: 'AUTH_SET_TOKEN',
    session: token,
    redirect: redirect
  };
}

function receiveError(message) {
  localStorage.removeItem('token');
  return {
    type: 'RECEIVE_AUTH_ERROR',
    error: message
  };
}

function tokenOK() {
  return {
    type: 'TOKEN_OK'
  };
}

function canFetch(state) {
  return !state.getIn(['session', 'isChecking']);
}

function sendAuthentication(username, password) {
  return dispatch => {
    dispatch(request());
    axios.get('/login', {
      url: "/login",
      method: 'get',
      baseURL: "http://localhost:3030",
      auth: {
        username: username,
        password: password
      }
    }).then(function (response) {
      dispatch(receiveToken('/messages', response.data.token));
      browserHistory.push('/messages');
    }).catch(function (error) {
      dispatch(receiveError('Error while locking in. Please check credentials.'));
    });
  }
}

function sendToken(token, role) {
  if (role === undefined) {
    role = "ALL";
  }
  return dispatch => {
    dispatch(request());
    axios.get('/checkToken', {
      url: "/checkToken",
      baseURL: "http://localhost:3030",
      method: 'get',
      headers: {
        'Authorization': token
      }
    }).then(function (response) {
      dispatch(tokenOK());
    }).catch(function (error) {
      dispatch(receiveError('Please log in first!'));
      browserHistory.push('/login')
    });
  }
}

export function authenticate(username, password) {
  return (dispatch, getState) => {
    if (canFetch(getState().auth)) {
      return dispatch(sendAuthentication(username, password))
    } else {
      return Promise.resolve()
    }
  }
}

export function checkToken(role) {
  return (dispatch, getState) => {
    let token = localStorage.getItem('token');
    if (canFetch(getState().auth) && token !== undefined) {
      return dispatch(sendToken(token, role))
    } else {
      return Promise.resolve()
    }
  }
}

function logOut() {
  localStorage.removeItem('token');
  return {
    type: "LOGOUT"
  };
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logOut());
        //appHistory.push('/login');
    }
}
