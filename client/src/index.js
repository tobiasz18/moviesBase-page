import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore from './store/configureStore';

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
)

