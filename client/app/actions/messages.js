import axios from 'axios';
import io from 'socket.io-client';
import {ORGANIZATION, BASEURL} from './../constants';
var socket = undefined;

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
    dispatch(connectionSent(socket));
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

export function sendMessageToChannel(message, channelName, username) {
  return (dispatch, getState) => {
    if (!canConnect(getState().messages, 'isConnected')) {
      const socket = getState().messages.getIn(["socket"]);
      return dispatch(sendMessage(socket, message, channelName, username));
    } else {
      return Promise.resolve()
    }
  }
}

function sendMessage(socket, message, channelName, username) {
  return dispatch => {
    socket.emit('client:newMessage', {
      message: message,
      channelName: channelName,
      username: username,
      organization: ORGANIZATION
    })
  }
}

function deconnectOldChannel() {
  return {
    type: 'DECONNECT_OLD_CHANNEL'
  }
}

function connectionSent(socket) {
  return {
    type: 'CONNECTION_SENT',
    socket: socket
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
