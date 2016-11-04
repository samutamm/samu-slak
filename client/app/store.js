import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import authMiddleware from './authMiddleware';

const store = createStore(reducers, applyMiddleware(authMiddleware));
export default store;
