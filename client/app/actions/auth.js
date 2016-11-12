import {Map} from 'immutable';
import axios from 'axios';

function request() {
  return {
    type: 'REQUEST'
  };
}

export function receiveToken(session) {
  localStorage.setItem('token', session.token);
  return {
    type: 'AUTH_SET_TOKEN',
    session: session
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
  return !state.isChecking;
}

function sendAuthentication(url, username, password) {
  return dispatch => {
    dispatch(request());
    axios.get('/login', {
      url: "/login",
      method: 'get',
      auth: {
        username: 'janedoe',
        password: 's00pers3cret'
      }
    }).then(function (response) {
      dispatch(receiveToken(reponse.responseJSON));
      //appHistory.push('/profile');
    }).catch(function (error) {
      dispatch(receiveError('Error while locking in. Please check credentials.'));
    });
  }
}

function sendToken(url, token, role) {
  if (role === undefined) {
    role = "ALL";
  }
  return dispatch => {
    dispatch(request());
    $.ajax({
      url: url,
      dataType: 'json',
      type: "GET",
      async: true,
      headers: {
        "Authorization": "Basic " + token + " " + role
      },
      complete: function(response) {
        if (response.status === 200) {
          dispatch(tokenOK());
        } else {
          dispatch(receiveError('Please log in first!'));
          //appHistory.push('/login');
        }
      }
    });
  }
}

export function authenticate(url, username, password) {
  return (dispatch, getState) => {
    if (canFetch(getState().user)) {
      return dispatch(sendAuthentication(url, username, password))
    } else {
      return Promise.resolve()
    }
  }
}

export function checkToken(url, role) {
  return (dispatch, getState) => {
    let token = localStorage.getItem('token');
    if (canFetch(getState().loginReducer) && token !== undefined) {
      return dispatch(sendToken(url, token, role))
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
