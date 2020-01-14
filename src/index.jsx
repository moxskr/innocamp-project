import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';

if(!localStorage.getItem('lastId')){
  localStorage.setItem('lastId', JSON.stringify(0));
}

if(!localStorage.getItem('todoList')){
  localStorage.setItem('todoList', JSON.stringify([]));
}

render(<App/>, document.getElementById('root'));
