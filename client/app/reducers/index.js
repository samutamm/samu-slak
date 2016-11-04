import { combineReducers } from 'redux';

// Reducers
import authReducer from './auth-reducer.js';

// Combine Reducers
var reducers = combineReducers({
    authState: authReducer
});

export default reducers;
