import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
)

