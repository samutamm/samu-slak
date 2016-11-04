import React from 'react';
import {render} from 'react-dom';
import MainLayout from './components/layouts/main-layout.jsx';

import { Provider } from 'react-redux';
import store from './store';
import Router from './router.jsx';

render(
  <Provider store={store}>{Router}</Provider>,
  document.getElementById('app')
);
