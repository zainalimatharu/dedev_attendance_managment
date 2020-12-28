import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import Router from './components/Router';
import Alerts from './components/Alert/Alert';

import { Provider } from 'react-redux';
import store from './redux/store/store.js';
import { getUser } from './redux/actions/user';

function App() {
  useEffect(() => {
    store.dispatch(getUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Nav />
          <div className="wrapper">
            <Alerts />
            <Router />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
