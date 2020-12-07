import React from 'react';
import {
  BrowserRouter,
  withRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import AddEmployee from './components/AddEmployee/AddEmployee';

import { Provider } from 'react-redux';
import store from './redux/store/store.js';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Nav />
          <div className="wrapper">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/add_employee" component={AddEmployee} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
