import {Map} from 'immutable';
import axios from 'axios';

const organization = "samu"; //Hard coded at the moment
const baseURL = "http://localhost:8080";

function request() {
  return {
    type: 'CHANNEL-REQUEST'
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
    dispatch(request());
    axios.get('/channels', {
      params: {
        organization: organization
      },
      method: 'get',
      baseURL: baseURL,
    }).then(function (response) {
      dispatch(receiveChannels(response.data));
    }).catch(function (error) {
      dispatch(receiveError(error));
    });
  }
}

function joinChannel(channelName, username) {
  return dispatch => {
    dispatch(request());
    axios.post('/channels/join', {
        organization: organization,
        channel: channelName,
        username: username
      },
      {
        method: 'post',
        baseURL: baseURL
      }).then(function (response) {
        debugger;
      dispatch(joinedSuccess());
    }).catch(function (error) {
      debugger;
      dispatch(receiveError(error));
    });
  }
}

export function fetchChannels() {
  return (dispatch, getState) => {
    if (canFetch(getState().channels)) {
      return dispatch(fetch());
    } else {
      return Promise.resolve()
    }
  }
}

export function joinUserToChannel(channelName, username) {
  return (dispatch, getState) => {
    if (canFetch(getState().channels)) {
      return dispatch(joinChannel(channelName, username));
    } else {
      return Promise.resolve()
    }
  }
}

function canFetch(state) {
  return !state.getIn(['isFetching']);
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
