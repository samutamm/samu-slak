import axios from 'axios';
import io from 'socket.io-client';
import {ORGANIZATION, BASEURL} from './../constants';
let socket = undefined;

function connectChannel(channelName, username) {
  return dispatch => {
    socket = io('http://localhost:3000');
    socket.on('server:connected', function(sessionId) {
      dispatch(connectedSuccess(sessionId, channelName));
      socket.emit('client:join', {
        username: username,
        channel: channelName,
        organization: ORGANIZATION
      });
    });
    socket.on('server:messages', function(msg) {
      dispatch(receivedMessages(msg.messages));
    });
    dispatch(connectionSent());
  }
}

function canConnect(state, resourse) {
  return !state.getIn([resourse]);
}

export function connectUserToChannel(channelName, username) {
  return (dispatch, getState) => {
    const oldChannelName = getState().messages.getIn(["channel"]);
    if (oldChannelName !== '' && oldChannelName !== channelName) {
      dispatch(deconnectOldChannel());
    }
    if (canConnect(getState().messages, 'isConnected')) {
      return dispatch(connectChannel(channelName, username));
    } else {
      return Promise.resolve()
    }
  }
}

function deconnectOldChannel() {
  return {
    type: 'DECONNECT_OLD_CHANNEL'
  }
}

function connectionSent() {
  return {
    type: 'CONNECTION_SENT'
  };
}

function connectedSuccess(sessionId, channel) {
  return {
    type: 'CONNECTED_SUCCESS',
    channel: channel,
    sessionId: sessionId
  };
}

function receivedMessages(messages) {
  return {
    type: 'RECEIVED_MESSAGES',
    messages: messages
  };
}
