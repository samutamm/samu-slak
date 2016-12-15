import {List, Map, fromJS} from 'immutable';

function initial() {
  return Map({
    isConnected: false,
    channel: '',
    sessionId: undefined,
    messages: [],
    socket: undefined
  });
}

function setSessionId(state, channel, sessionId) {
  const connected = state.setIn(["isConnected"], true);
  const channelAdded = connected.setIn(["channel"], channel);
  return channelAdded.setIn(["sessionId"], sessionId);
}

function setMessages(state, messages) {
  const connected = state.setIn(["isConnected"], true);
  return connected.setIn(["messages"], messages);
}

function setSocket(state, socket) {
  return state.setIn(["socket"], socket);
}

function cleanState(state) {
  const sessionId = state.getIn(['sessionId']);
  return initial().setIn(['sessionId'], sessionId);
}

export default function(state = initial(), action) {
  switch (action.type) {
    case 'CONNECTION_SENT':
      return setSocket(state, action.socket);
    case 'CONNECTED_SUCCESS':
      return setSessionId(state, action.channel, action.sessionId);
    case 'RECEIVED_MESSAGES':
      return setMessages(state, action.messages);
    case 'DECONNECT_OLD_CHANNEL':
      return cleanState(state);
  }
  return state;
}
