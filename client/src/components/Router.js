import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login/Login';
import AddEmployee from './AddEmployee/AddEmployee';
import Loading from '../components/Loading/Loading';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard/EmployeeDashboard';

const Router = ({ auth: { isAuthenticated, systemRole, loading } }) => {
  return (
    <Switch>
      {/* <Route exact path="/login" component={Login} /> */}
      <Route
        exact
        path="/login"
        render={
          () =>
            loading ? (
              <Loading loading={loading} />
            ) : isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <Login />
            )
          // !loading && isAuthenticated ? <Redirect to="/dashboard" /> : <Login />
        }
      />
      <Route exact path="/addEmployee" component={AddEmployee} />
      {/* <Route exact path="/adminDashboard" component={AdminDashboard} /> */}
      <Route
        exact
        path="/dashboard"
        render={
          () =>
            loading ? (
              <Loading loading={loading} />
            ) : isAuthenticated && systemRole === 'admin' ? (
              <AdminDashboard />
            ) : isAuthenticated && systemRole === 'employee' ? (
              <EmployeeDashboard />
            ) : (
              <Redirect to="/login" />
            )
          // !loading && isAuthenticated ? (
          //   systemRole === 'admin' ? (
          //     <AdminDashboard />
          //   ) : (
          //     systemRole === 'employee' && <EmployeeDashboard />
          //   )
          // ) : (
          //   <Redirect to="/login" />
          // )
        }
        // render={() => {
        //   store.getState().auth.isAuthenticated ? (
        //     <AdminDashboard />
        //   ) : (
        //     <Redirect to={{ pathname: '/login' }} />
        //   );
        // }}
      />
      {/* <Route
        exact
        path="/employeeDashboard"
        render={() =>
          !loading && isAuthenticated && systemRole === 'employee' ? (
            <EmployeeDashboard />
          ) : (
            <Redirect to="/login" />
          )
        }
      /> */}
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Router));
