import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './config/routes';
import configureStore from './config/store';
import './config/api';

import 'antd/dist/antd.css';
import './index.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes/>
		</BrowserRouter>
	</Provider>,
  document.getElementById('root'));
