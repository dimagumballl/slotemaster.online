import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App/App';
import reportWebVitals from './reportWebVitals';

import configureStore  from './Store/CreateStore';


  const store = configureStore();
 
  //Note that subscribe() returns a function for unregistering the listener
   




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
