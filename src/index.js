import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppRoutes from "./AppRoutes";
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(<MuiThemeProvider><Router><AppRoutes /></Router></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
