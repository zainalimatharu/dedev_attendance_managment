// importing react stuff
import React, { useState, useEffect } from 'react';
import './style.css';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

// importing material-ui stuff
import { Grid, Paper, Tooltip } from '@material-ui/core';
import {
  LockOutlined,
  TodayOutlined,
  Check,
  Fingerprint,
  AssignmentTurnedInOutlined,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

// importing required redux actions
import {} from '../../redux/actions/attendance';

// importing images
import scheduling from './scheduling.png';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    placeItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '20px',
    width: '20px',
  },
  heading: {
    color: '#666',
    marginBottom: '35px',
  },
  blockQoute: {
    fontWeight: '500',
    fontSize: '1.05rem',
    padding: '10px 20px',
    borderLeft: '0.2857rem solid rgb(255, 212, 207)',
  },
  status: {
    padding: '10px 20px',
    backgroundColor: 'rgb(255, 212, 207)',
    height: '100%',
  },
  alert: {
    marginBottom: '25px',
  },
  header: {
    padding: '6px 20px',
    backgroundColor: '#e4eaee',
    border: '1px solid #c6d2d9',
    color: '#999',
    fontSize: '.8571rem',
    alignItems: 'center',
  },
  content: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    border: '1px solid #c6d2d9',
    borderBottom: '5px solid #c6d2d9',
    marginTop: '-1px',
    alignItems: 'center',
  },
  time: {
    backgroundColor: 'transparent',
    border: 'none',
    marginLeft: '10px',
    color: '#333',
    fontSize: '1.286rem',
    fontWeight: 'bold',
  },
  beforeIcon: {
    margin: '4px 20px 0 0',
    fontSize: '1.1rem',
  },
  afterIcon: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#90a4ae',
    },
    borderRadius: '10px',
    transition: '0.35s',
    padding: '1px',
  },
});

const Attendance = () => {
  const { root, image, blockQoute, status, wrapper } = useStyles();
  const { header, content, alert, time, beforeIcon, afterIcon } = useStyles();

  const [date, setDate] = useState(new Date());
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 768
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  const strip = (text) => (
    <Grid
      item
      container
      xs={12}
      component={Paper}
      square
      elevation={0}
      variant="outlined"
      style={{ margin: '25px 0', width: '100%' }}
    >
      <Grid item xs className={blockQoute} container>
        <Grid item style={{ marginRight: '20px' }}>
          <LockOutlined />
        </Grid>
        <Grid item xs>
          {text}
        </Grid>
      </Grid>
      <Tooltip title="Verified" placement="left">
        <Grid item className={status}>
          <Check />
        </Grid>
      </Tooltip>
    </Grid>
  );

  const snackBar = (
    headerText,
    timeText,
    details,
    toolTipText,
    showAttendanceIcon
  ) => (
    <Grid item xs={12} container className={alert}>
      <Grid item xs={12} container className={header}>
        <Grid item xs>
          {headerText}
        </Grid>
        <Grid item>
          <span>{timeText}</span>
          <input
            type="time"
            value={moment().format('HH:mm')}
            className={time}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container className={content}>
        <Grid item>
          <AssignmentTurnedInOutlined className={beforeIcon} />
        </Grid>
        <Grid item xs>
          {details}
        </Grid>
        {showAttendanceIcon && (
          <Grid item>
            <Tooltip title={toolTipText} placement="left">
              <Fingerprint className={afterIcon} />
            </Tooltip>
          </Grid>
        )}
      </Grid>
    </Grid>
  );

  return (
    <Grid container className={root}>
      <Grid item xs={12} className={wrapper} container>
        {strip('You did not arrive Today')}
        {snackBar(
          'Not Arrived',
          'Select Time:',
          'Mark your atttendance',
          'Click to mark your Attendance',
          true
        )}
      </Grid>
    </Grid>
  );
};

export default Attendance;
