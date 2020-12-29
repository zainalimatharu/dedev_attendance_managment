import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login/Login';
import AddEmployee from './AddEmployee/AddEmployee';
import Loading from '../components/Loading/Loading';
import Dashboard from './Dashboard/Dashboard';
import EditProfile from './EditProfile/EditProfile';
import Employees from './Employees/Employees';

const Router = ({ auth: { user, isAuthenticated, systemRole, loading } }) => {
  return (
    <Switch>
      {/* home route */}
      <Route
        exact
        path="/"
        render={() =>
          loading ? (
            <Loading loading={loading} />
          ) : isAuthenticated ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      {/* login route */}
      <Route
        exact
        path="/login"
        render={() =>
          loading ? (
            <Loading loading={loading} />
          ) : isAuthenticated ? (
            <Redirect to="/dashboard" />
          ) : (
            <Login />
          )
        }
      />
      {/* addEmployee route */}
      <Route
        exact
        path="/addEmployee"
        render={() =>
          loading ? (
            <Loading loading={loading} />
          ) : isAuthenticated && systemRole === 'admin' ? (
            <AddEmployee />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      {/* dashboard route */}
      <Route
        exact
        path="/dashboard"
        render={() =>
          loading ? (
            <Loading loading={loading} />
          ) : isAuthenticated && systemRole === 'admin' ? (
            <Dashboard />
          ) : isAuthenticated && systemRole === 'employee' ? (
            <Dashboard />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      {/* editProfile route */}
      <Route
        exact
        path="/editProfile/:userId"
        render={() =>
          loading ? (
            <Loading loading={loading} />
          ) : isAuthenticated ? (
            <EditProfile />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      {/* employees route */}
      <Route
        exact
        path="/employees"
        render={() =>
          loading ? (
            <Loading loading={loading} />
          ) : isAuthenticated ? (
            <Employees />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Router));
