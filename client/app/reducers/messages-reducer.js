import {List, Map, fromJS} from 'immutable';

function initial() {
  return Map({
    isConnected: false,
    channel: '',
    sessionId: undefined
  });
}

function setJoined(state, channel) {
  const connected = state.setIn("isConnected", true);
  return connected.setIn("channel", channel);
}

function setSessionId(state, sessionId) {
  return state.setIn("sessionId", sessionId);
}

export default function(state = initial(), action) {
  switch (action.type) {
    case 'JOINED_SUCCESS':
      return setJoined(state, action.channel);
    case 'CONNECTION_SENT':
      return state;
    case 'CONNECTED_SUCCESS':
      return setSessionId(state, action.sessionId);
  }
  return state;
}
