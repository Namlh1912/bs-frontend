import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ConfigRouter from './config/routes';

import 'antd/dist/antd.css';
import './index.css';



ReactDOM.render(
  <BrowserRouter>
    <ConfigRouter/>
  </BrowserRouter>,
  document.getElementById('root'));
