import React, { useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login/Login';
import AddEmployee from './AddEmployee/AddEmployee';
import Loading from '../components/Loading/Loading';
// import Dashboard from './Dashboard/Dashboard';
import NewDashboard from './NewDashboard/NewDashboard';
import EditProfile from './EditProfile/EditProfile';
import Employees from './Employees/Employees';
// import Reports from './Reports/Reports';
import NewReports from './NewReports/NewReports';
import Attendance from './Attendance/Attendance';

const Router = ({ auth: { systemRole, isAuthenticated, loading } }) => {
  return (
    <Switch>
      {/* home route */}
      <Route
        exact
        path="/"
        render={() =>
          loading ? (
            <Loading loading={loading} />
          ) : isAuthenticated && systemRole === 'admin' ? (
            <Redirect to="/reports" />
          ) : isAuthenticated && systemRole === 'employee' ? (
            <Redirect to="/attendance" />
          ) : (
            <Login />
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
          ) : isAuthenticated && systemRole === 'admin' ? (
            <Redirect to="/reports" />
          ) : isAuthenticated && systemRole === 'employee' ? (
            <Redirect to="/attendance" />
          ) : (
            <Login />
          )
        }
      />
      {/* addEmployee route */}
      <Route
        exact
        path="/addUser"
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
            <NewDashboard />
          ) : isAuthenticated && systemRole === 'employee' ? (
            <NewDashboard />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      {/* editProfile route */}
      <Route
        exact
        path="/profile/:userId"
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
      {/* attendance route */}
      <Route
        exact
        path="/attendance"
        render={() =>
          loading ? (
            <Loading loading={loading} />
          ) : isAuthenticated ? (
            <Attendance />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      {/* team route */}
      <Route
        exact
        path="/team"
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
      {/* reports route */}
      <Route
        exact
        path="/reports"
        render={() =>
          loading ? (
            <Loading loading={loading} />
          ) : isAuthenticated && systemRole === 'admin' ? (
            <NewReports />
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
