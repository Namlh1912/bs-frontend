import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router'
import Routes from './config/routes';
import {createBrowserHistory} from "history";
import configureStore from './config/store';
import './config/api';

import 'antd/dist/antd.css';
import './index.css';
import './styles/theme.less';

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Routes/>
		</ConnectedRouter>
	</Provider>,
  document.getElementById('root'));
