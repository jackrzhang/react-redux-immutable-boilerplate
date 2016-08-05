import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import DevTools from './DevTools';

import { Provider } from 'react-redux';
import configureStore from './configureStore';
const store = configureStore();

let Root;
if (process.env.NODE_ENV === 'development') {
  Root = () => (
    <Provider store={store}>
      <div>
        <App />
        <DevTools />
      </div>
    </Provider>
  );
} else {
  Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
