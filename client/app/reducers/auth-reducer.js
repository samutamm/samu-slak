import {List, Map, fromJS} from 'immutable';

function initial() {
  return Map({
    session: Map({
      message: '',
      isAuthenticated: false,
      isChecking: false,
      token: null
    })
  });
}

function setFetchingFlag(state) {
  return state.setIn(['session', 'isChecking'], true);
}

function setAuthenticated(state, username) {
  const usernameAdded = state.setIn(['session', 'username'], username);
  return usernameAdded.setIn(['session', 'isAuthenticated'], true);
}

function setToken(state, session, username) {
  return setAuthenticated(state.setIn(['session', 'isChecking'], false), username);
}

function setError(state, message) {
  const newState = state.setIn(['session', 'message'], message);
  const notAuthenticated = newState.setIn(['session', 'isAuthenticated'], false);
  return notAuthenticated.setIn(['session', 'isChecking'], false);
}

function logOut(state) {
  const noToken = state.setIn(['session', 'token'], null);
  return noToken.setIn(['session', 'isAuthenticated'], false);
}

export default function(state = initial(), action) {
  switch (action.type) {
  case 'REQUEST':
    return setFetchingFlag(state);
  case 'AUTH_SET_TOKEN':
    return setToken(state, action.session, action.username);
  case 'RECEIVE_AUTH_ERROR':
    return setError(state, action.error);
  case 'TOKEN_OK':
    return setAuthenticated(state, action.username);
  case 'LOGOUT':
    return logOut(state);
  }
  return state;
}
