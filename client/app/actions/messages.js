import io from 'socket.io-client';
let socket = undefined;

function connectChannel(channelName, username) {
  return dispatch => {
    socket = io('http://localhost:3000');
    socket.on('server:connected', function(sessionId) {
      dispatch(connectedSuccess(sessionId));
      socket.emit('client:join', {
        username: username,
        channel: channelName
      });
    });
    socket.on('server:messages', function(msg) {
      debugger;
    })
    dispatch(connectionSent());
  }
}

function canConnect(state, resourse) {
  return !state.getIn([resourse]);
}

export function connectUserToChannel(channelName, username) {
  return (dispatch, getState) => {
    if (canConnect(getState().messages, 'isConnected')) {
      return dispatch(connectChannel(channelName, username));
    } else {
      return Promise.resolve()
    }
  }
}

function connectionSent() {
  return {
    type: 'CONNECTION_SENT'
  };
}

function connectedSuccess(sessionId) {
  return {
    type: 'CONNECTED_SUCCESS',
    sessionId: sessionId
  };
}
