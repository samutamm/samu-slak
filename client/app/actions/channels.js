import {Map} from 'immutable';
import axios from 'axios';

function request() {
  return {
    type: 'CHANNEL-REQUEST'
  };
}

function fetch() {
  return dispatch => {
    dispatch(request());
    axios.get('/channels', {
      params: {
        organization: "samu" //Hard coded at the moment
      },
      url: "/channels",
      method: 'get',
      baseURL: "http://localhost:8080",
    }).then(function (response) {
      dispatch(receiveChannels(response.data));
    }).catch(function (error) {
      console.log(error);
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

function canFetch(state) {
  return !state.getIn(['isFetching']);
}

export function receiveChannels(channels) {
  return {
    type: 'SET_CHANNELS',
    channels: channels
  };
}
