import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import Router from './components/Router';
import SideNav from './components/SideNav/SideNav';
import Alerts from './components/Alert/Alert';
import Layout from './Layout';

import { Provider } from 'react-redux';
import store from './redux/store/store.js';
import { getUser } from './redux/actions/user';

function App() {
  useEffect(() => {
    store.dispatch(getUser());
  }, []);

  console.log(store.getState().auth);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
