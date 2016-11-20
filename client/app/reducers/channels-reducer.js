import {List, Map, fromJS} from 'immutable';

function initial() {
  return Map({
    channels: []
  });
}


export default function(state = initial(), action) {
  switch (action.type) {
  case 'CHANNEL-REQUEST':

  }
  return state;
}
