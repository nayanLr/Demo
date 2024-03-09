import React from 'react';
import Router from './src/routes';
import { Provider } from 'react-redux';
import store from './src/store';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}


export default App;
