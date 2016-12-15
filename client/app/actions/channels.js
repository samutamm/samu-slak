import {Map} from 'immutable';
import axios from 'axios';
import Config from 'Config';

function request(resourse) {
  return {
    type: 'CHANNEL-REQUEST',
    resourse: resourse
  };
}

function receiveError(message) {
  return {
    type: 'RECEIVE_ERROR',
    error: message
  };
}

function fetch() {
  return dispatch => {
    dispatch(request('isFetchingAll'));
    axios.get('/channels', {
      params: {
        organization: Config.ORGANIZATION
      },
      method: 'get',
      baseURL: Config.BASEURL,
    }).then(function (response) {
      dispatch(receiveChannels(response.data));
    }).catch(function (error) {
      dispatch(receiveError(error));
    });
  }
}

function fetchUsers(username) {
  return dispatch => {
    dispatch(request('isFetchingUsers'));
    axios.get('/channels/' + username, {
      params: {
        organization: Config.ORGANIZATION,
      },
      method: 'get',
      baseURL: Config.BASEURL,
    }).then(function (response) {
      dispatch(receiveUsersChannels(response.data));
    }).catch(function (error) {
      dispatch(receiveError(error));
    });
  }
}

function joinChannel(channelName, username) {
  return dispatch => {
    dispatch(request('isJoining'));
    axios({
        url: '/channels/join',
        params: {
          organization: Config.ORGANIZATION,
          channel: channelName,
          username: username
        },
        headers: {
          'Content-Type':'text/plain'
        },
        method: 'post',
        baseURL: Config.BASEURL
      }).then(function (response) {
      dispatch(joinedSuccess());
      dispatch(fetchUsersChannels(username));
    }).catch(function (error) {
      dispatch(receiveError(error));
    });
  }
}

function quitChannel(channelName, username) {
  return dispatch => {
    dispatch(request('isQuitting'));
    axios({
        url: '/channels/quit',
        params: {
          organization: Config.ORGANIZATION,
          channel: channelName,
          username: username
        },
        headers: {
          'Content-Type':'text/plain'
        },
        method: 'post',
        baseURL: Config.BASEURL
      }).then(function (response) {
        dispatch(quittedSuccess());
        dispatch(fetchUsersChannels(username));
    }).catch(function (error) {
      dispatch(receiveError(error));
    });
  }
}


export function fetchChannels() {
  return (dispatch, getState) => {
    if (canFetch(getState().channels, 'isFetchingAll')) {
      return dispatch(fetch());
    } else {
      return Promise.resolve()
    }
  }
}

export function joinUserToChannel(channelName, username) {
  return (dispatch, getState) => {
    if (canFetch(getState().channels, 'isJoining')) {
      return dispatch(joinChannel(channelName, username));
    } else {
      return Promise.resolve()
    }
  }
}

export function quitUserFromChannel(channelName, username) {
  return (dispatch, getState) => {
    if (canFetch(getState().channels, 'isQuitting')) {
      return dispatch(quitChannel(channelName, username));
    } else {
      return Promise.resolve()
    }
  }
}

export function fetchUsersChannels(username) {
  return (dispatch, getState) => {
    if (canFetch(getState().channels, 'isFetchingUsers')) {
      return dispatch(fetchUsers(username));
    } else {
      return Promise.resolve()
    }
  }
}

function canFetch(state, resourse) {
  return !state.getIn([resourse]);
}

export function receiveChannels(channels) {
  return {
    type: 'SET_CHANNELS',
    channels: channels
  };
}

function joinedSuccess() {
  return {
    type: 'SET_JOINED'
  };
}

function quittedSuccess() {
  return {
    type: 'SET_QUITTED'
  };
}

function receiveUsersChannels(channels) {
  return {
    type: 'SET_USERS_CHANNELS',
    channels: channels
  };
}
