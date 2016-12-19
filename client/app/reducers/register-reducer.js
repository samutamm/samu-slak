import {List, Map, fromJS} from 'immutable';

function initial() {
  return Map({
    message: '',
    isRequesting: false
  });
}

function setFetchingFlag(state) {
  return state.setIn(['isRequesting'], true);
}

function removeFetchinFlag(state) {
  return state.setIn(['isRequesting'], false);
}

function setError(state, message) {
  const newState = state.setIn(['message'], message);
  return newState.setIn(['isRequesting'], false);
}

export default function(state = initial(), action) {
  switch (action.type) {
  case 'REQUEST':
    return setFetchingFlag(state);
  case 'REGISTER_SUCCESS':
    return removeFetchinFlag(state);
  case 'RECEIVE_REGISTER_ERROR':
    return setError(state, action.error);
  }
  return state;
}
