import {List, Map, fromJS} from 'immutable';

function initial() {
  return Map({
    channels: [],
    usersChannels: [],
    isFetchingAll: false,
    isFetchingUsers: false,
    isJoining: false
  });
}

function setFetchingFlag(state, resourse) {
  return state.setIn([resourse], true);
}

function setFetched(state, channels, tag, resourse) {
  const channelsRemoved = state.setIn([tag], null);
  const channelsList = channels.map(function(item){
    return item.name;
  }).filter(function(i) { return i !== undefined;});
  const channelsAdded = channelsRemoved.setIn([tag], channelsList);
  return removeFetchingFlag(channelsAdded, resourse);
}

function removeFetchingFlag(state, resourse) {
  return state.setIn([resourse], false);
}

export default function(state = initial(), action) {
  switch (action.type) {
    case 'CHANNEL-REQUEST':
      return setFetchingFlag(state, action.resourse);
    case 'SET_CHANNELS':
        return setFetched(state, action.channels, 'channels', 'isFetchingAll');
    case 'RECEIVE_ERROR':
        state = removeFetchingFlag(state, 'isJoining');
        state = removeFetchingFlag(state, 'isFetchingUsers');
        state = removeFetchingFlag(state, 'isQuitting');
        return removeFetchingFlag(state, 'isFetchingAll');
    case 'SET_JOINED':
        return removeFetchingFlag(state, 'isJoining');
    case 'SET_USERS_CHANNELS':
        return setFetched(state, action.channels, 'usersChannels', 'isFetchingUsers');
    case 'SET_QUITTED':
        return removeFetchingFlag(state, 'isQuitting');

  }
  return state;
}
