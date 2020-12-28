import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';
import { Alert } from '@material-ui/lab';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';

function MyAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alerts = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <MyAlert key={alert.id} severity={alert.alertType}>
        {alert.msg}
      </MyAlert>
    ))
  );
};

const StickyAlert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className={`alert ${alert.alertType}`} key={alert.id}>
        {alert.msg}
      </div>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(StickyAlert);
