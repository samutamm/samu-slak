import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import MainLayout from './components/layouts/main-layout.jsx';

import Home from './components/home.jsx';

export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Home} />
    </Route>
  </Router>
);

/*<Route path="widgets">
  <Route component={SearchLayoutContainer}>
    <IndexRoute component={WidgetListContainer} />
  </Route>
</Route>*/
