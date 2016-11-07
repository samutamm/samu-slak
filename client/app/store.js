import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers';

const store = createStore(
  reducers,
  applyMiddleware(routingMiddleware)
);
export default store;
