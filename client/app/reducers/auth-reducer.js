var {
  AUTH_SET_TOKEN,
  AUTH_DISCARD_TOKEN,
  AUTH_SET_USER
} = require('../constants');

function auth(state = {}, action){
  switch(action.type){
    // saves the token into the state
    case AUTH_SET_TOKEN:
      return {
        user: action.user,
        token: action.token
      };
    // discards the current token (logout)
    case AUTH_DISCARD_TOKEN:
      return {};
    // saves the current user
    case AUTH_SET_USER:
      return {
        user: action.user,
        token: action.token
      };
    // as always, on default do nothing
    default:
      return state;
  }
}

module.exports = auth;
