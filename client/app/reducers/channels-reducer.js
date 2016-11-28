import {List, Map, fromJS} from 'immutable';

function initial() {
  return Map({
    channels: [],
    isFetching: false
  });
}

function setFetchingFlag(state) {
  return state.setIn(['isFetching'], true);
}

function setFetched(state, channels) {
  const channelsList = channels.map(function(item){
    return item.channels.data.name;
  })
  const channelsAdded = state.setIn(['channels'], channelsList);
  return channelsAdded.setIn(['isFetching'], false);
}

export default function(state = initial(), action) {
  switch (action.type) {
    case 'CHANNEL-REQUEST':
      return setFetchingFlag(state);
    case 'SET_CHANNELS':
        return setFetched(state, action.channels);
  }
  return state;
}
