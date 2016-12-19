import {Map} from 'immutable';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Config from 'Config';
import {sendAuthentication} from './auth';

function request() {
  return {
    type: 'REGISTER-REQUEST'
  };
}

export function registerSuccess(token, username) {
  return {
    type: 'REGISTER_SUCCESS',
    session: token,
    username: username
  };
}

function receiveError(message) {
  return {
    type: 'RECEIVE_REGISTER_ERROR',
    error: message
  };
}

function canFetch(state) {
  return !state.getIn(['isRequesting']);
}

function sendRegistration(username, password) {
  return dispatch => {
    dispatch(request());
    // sended data is in the form of model on server
    axios({
      url: '/register',
      data: {
        name: username,
        email: '',
        address: '',
        username: username,
        password: password,
        role: ''
      },
      method: 'post',
      baseURL: Config.AUTH_URL,
      validateStatus: function (status) {
        return status >= 200 && status < 300 || status === 409;
      },
    }).then(function (response) {
      if (response.status === 409) {
        dispatch(receiveError('Nickname ' + username + " is reserved! Please choose an other one."));
      } else {
          dispatch(registerSuccess());
          dispatch(sendAuthentication(username, password));
      }
    }).catch(function (error) {
      dispatch(receiveError('Error while creating nickname. Please check credentials.'));
    });
  }
}

export function register(username, password) {
  return (dispatch, getState) => {
    if (canFetch(getState().register)) {
      return dispatch(sendRegistration(username, password))
    } else {
      return Promise.resolve()
    }
  }
}
