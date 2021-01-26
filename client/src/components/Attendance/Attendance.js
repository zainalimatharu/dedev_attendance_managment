// importing react stuff
import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

// importing material-ui stuff
import { Grid, Typography } from '@material-ui/core';
import { LockOutlined, LockOpenOutlined } from '@material-ui/icons';

// importing required redux actions
import { setArrival, setDeparture } from '../../redux/actions/attendance';
import { clearReport, getMyReport } from '../../redux/actions/report';
import { setOpenPage } from '../../redux/actions/navigation';

// importing required Components
import Loading from '../Loading/Loading';
import SnackBar from './Snackbar';
import Alert from './Alert';

// importing required helper function
import {
  arrivalTimeCompare,
  departureTimeCompare,
  calcTimeStayed,
} from './helpers';

// importing material-ui classes
import useStyles from './styles';

// The component
const Attendance = ({
  auth: { user },
  report: {
    me: { myReport, presentToday },
    loading,
  },
  clearReport,
  getMyReport,
  setArrival,
  setDeparture,
  setOpenPage,
}) => {
  // initialize material-ui classes
  const { root, subTitle, wrapper, heading, total, time } = useStyles();

  // set arrival time
  const handleArrival = () => {
    const time = document.getElementById('time').value,
      y = moment().year(),
      m = moment().month() + 1,
      d = moment().date(),
      date = moment(new Date(`${y}-${m}-${d} ${time}`)).utc(true)._d;

    setArrival(date, user._id, user.name);
  };

  // set departure time
  const handleDeparture = () => {
    const time = document.getElementById('time').value,
      y = moment().year(),
      m = moment().month() + 1,
      d = moment().date(),
      date = moment(new Date(`${y}-${m}-${d} ${time}`)).utc(true)._d,
      eventId = myReport.daysAppeared[0].eventId;

    setDeparture(date, user._id, eventId, user.name);
  };

  // useEffect hook to set navigation openTab & document title
  useEffect(() => {
    document.title = 'Attendance | DeDev Technologies';
    setOpenPage('attendance');
  }, []);

  // useEffect hook to get myReport
  useEffect(() => {
    getMyReport({
      userId: user._id,
      gte: moment().startOf('day').utc(true)._d,
      lte: moment().endOf('day').utc(true)._d,
      message: 'Record Not Found',
    });

    return function cleanUp() {
      clearReport();
    };
  }, [getMyReport, clearReport]);

  // arrivalTime constant
  const arrivalTime =
    !loading && myReport
      ? moment(myReport.daysAppeared[0].arrivalTime).utc().format('hh:mm A')
      : null;

  // departureTime constant
  const departureTime =
    !loading && myReport && myReport.daysAppeared[0].departureTime
      ? moment(myReport.daysAppeared[0].departureTime).utc().format('hh:mm A')
      : null;

  return loading ? (
    <Loading />
  ) : (
    <Grid container className={root}>
      <Grid item xs={12}>
        <p className={heading}>Attendance</p>
      </Grid>
      <Grid item xs={12} className={wrapper} container>
        {!loading && !presentToday && (
          <Alert
            text="Arrival time not set"
            color="#03a9f4"
            varificationStatus="varfied"
          >
            <LockOutlined />
          </Alert>
        )}
        {!loading && presentToday && !myReport.daysAppeared[0].departureTime && (
          <Alert
            text="Departure time not set"
            color="#03a9f4"
            varificationStatus="varfied"
          >
            <LockOpenOutlined />
          </Alert>
        )}
        <Grid item xs={12} container>
          <Grid item xs>
            <Typography className={subTitle}>Today</Typography>
          </Grid>
          {!loading &&
            myReport &&
            myReport.daysAppeared[0].departureTime &&
            myReport.daysAppeared[0].departureTime && (
              <Grid item>
                <Typography className={total}>
                  <span>Total:{'  '}</span>
                  <span className={time}>
                    {calcTimeStayed(myReport.minutesWorked)}
                  </span>
                </Typography>
              </Grid>
            )}
        </Grid>
        {!loading && presentToday ? (
          <>
            <SnackBar
              headerText="Arrived"
              timeHeading="Arrived At:"
              timeText={arrivalTime}
              attendanceStatus={arrivalTimeCompare(
                myReport.daysAppeared[0].arrivalTime
              )}
              toolTipText={null}
              attendanceMethod={null}
              showAttendanceIcon={false}
            />
            {myReport.daysAppeared[0].departureTime ? (
              <SnackBar
                headerText="Departed"
                timeHeading="Departed At:"
                timeText={departureTime}
                attendanceStatus={departureTimeCompare(
                  myReport.daysAppeared[0].departureTime
                )}
                toolTipText={null}
                attendanceMethod={null}
                showAttendanceIcon={false}
                timeStayed={myReport.minutesWorked}
              />
            ) : (
              <SnackBar
                headerText="Not Departed"
                timeHeading="Select Time:"
                timeText={null}
                attendanceStatus="Set your departure time"
                toolTipText="Click to set your departure time"
                attendanceMethod={handleDeparture}
                showAttendanceIcon={true}
              />
            )}
          </>
        ) : (
          <SnackBar
            headerText="Not Arrived"
            timeHeading="Select Time:"
            timeText={null}
            attendanceStatus="Mark your atttendance"
            toolTipText="Click to mark your atttendance"
            attendanceMethod={handleArrival}
            showAttendanceIcon={true}
          />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  report: state.report,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getMyReport,
  clearReport,
  setArrival,
  setDeparture,
  setOpenPage,
})(Attendance);
