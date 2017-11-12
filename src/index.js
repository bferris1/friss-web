import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppRoutes from "./AppRoutes";
import {BrowserRouter as Router} from 'react-router-dom';
import reducer from './Store/reducers'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
