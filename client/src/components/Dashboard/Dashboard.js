import React, { useState, useEffect } from 'react';
import './style.css';
import { Avatar, Paper, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { connect } from 'react-redux';
import { getToday, getMyTimeSheet } from '../../redux/actions/report';
import { setArrival, setDeparture } from '../../redux/actions/attendance';
import { Profile } from '../Profile/Profile';
import moment from 'moment';

const EmployeeDashboard = ({
  report: { myTimeSheet, today, presentToday, loading },
  auth: { user },
  getToday,
  getMyTimeSheet,
  setArrival,
  setDeparture,
}) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: moment().startOf('day')._d,
      key: 'selection',
    },
  ]);

  const [arrivalTime, setArrivalTime] = useState(moment().format('hh:mm'));
  const [departureTime, setDepartureTime] = useState(moment().format('hh:mm'));

  const [collapsible, toggleCollapsible] = useState(false);

  useEffect(() => {
    getToday({
      userId: user._id,
      gte: moment().startOf('day').utc(true)._d,
      lte: moment().endOf('day').utc(true)._d,
      message: 'Record Not Found',
    });
  }, []);

  const calculateTimeSheet = (e) => {
    e.preventDefault();

    console.log(moment(date[0].startDate).startOf('day').utc(true)._d);
    console.log(moment(date[0].endDate).endOf('day').utc(true)._d);
    getMyTimeSheet({
      flag: 'timesheet',
      userId: user._id,
      gte: moment(date[0].startDate).startOf('day').utc(true)._d,
      lte: moment(date[0].endDate).endOf('day').utc(true)._d,
      message: 'No Record Found',
    });
  };

  return (
    <div className="employee">
      <div className="profile">
        <div className="container">
          <Avatar className="circular-image">{user.name.charAt(0)}</Avatar>
          <div className="bio-data">
            <div className="profile-name">
              <b className="h-1-a">{user.name}</b>
              <span>
                <Link to={`/editProfile/${user._id}`}>Edit profile</Link>
              </span>
            </div>
            <div className="bio">
              {user.bio ? user.bio : <span>No bio.</span>}
            </div>
            <div className="skills">
              <p onClick={() => console.log(user.skills.length)}>Skills:</p>
              <div className="skills-list">
                {user.skills.length > 0 ? (
                  user.skills.map((skill, idx) => (
                    <span key={idx}>{skill}</span>
                  ))
                ) : (
                  <span style={{ border: 'none' }}>No skills.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Profile
        name={user.name}
        bio={user.bio}
        skills={user.skills}
        showEditBtn={false}
        userId={user._id}
      /> */}
      <div className="arrived">
        <div className="container">
          <b className="today h-3-a">Today</b>
          <div className="today-data">
            {presentToday ? (
              <p className="h-4">
                You arrived at{' '}
                {/* {(format(new Date(today.daysAppeared[0])), 'HH:mm')} */}
                {moment(today.daysAppeared[0].arrivalTime)
                  .utc()
                  .format('hh:mm a')}
                <br />
                {today.daysAppeared[0].departureTime ? (
                  <p className="h-4">
                    You departed at{' '}
                    {moment(today.daysAppeared[0].departureTime)
                      .utc()
                      .format('hh:mm a')}
                  </p>
                ) : (
                  <span className="h-4">
                    <p
                      style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        display: 'inline',
                        marginRight: '15px',
                      }}
                      onClick={() => {
                        const time = document.getElementById('departureTime')
                          .value;
                        const y = moment().year();
                        const m = moment().month() + 1;
                        const d = moment().date();
                        setDeparture(
                          moment(`${y}-${m}-${d} ${time}`).utc(true)._d,
                          user._id
                        );
                      }}
                    >
                      Set departure time
                    </p>
                    <TextField
                      id="departureTime"
                      // label="Select Time"
                      type="time"
                      defaultValue={moment().format('hh:mm')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </span>
                )}
              </p>
            ) : (
              <p className="h-4">
                You didn't arrive today. Arrived now?
                <br />
                <span
                  style={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  <p
                    onClick={() => {
                      const time = document.getElementById('arrivalTime').value;
                      const y = moment().year();
                      const m = moment().month() + 1;
                      const d = moment().date();
                      setArrival(
                        moment(`${y}-${m}-${d} ${time}`).utc(true)._d,
                        user._id
                      );
                    }}
                    style={{ display: 'inline', marginRight: '15px' }}
                  >
                    Mark your attendance
                  </p>
                  <TextField
                    id="arrivalTime"
                    // label="Select Time"
                    type="time"
                    defaultValue={moment().format('hh:mm')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="arrived">
        <div className="container">
          <div className="today h-3-a">
            <p>Select customized range to view your data</p>
          </div>
          <div className="today-data">
            <DateRangePicker
              onChange={(item) => setDate([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={date}
              direction="horizontal"
              showDateDisplay={true}
            />
            <input
              type="button"
              value="Calculate"
              onClick={(e) => calculateTimeSheet(e)}
            />
          </div>
        </div>
      </div>
      {myTimeSheet && (
        <div className="arrived">
          <div className="container">
            <div className="today h-3-a">
              <p>
                {/* {format(new Date(date[0].startDate), 'MM/dd/yyyy')} */}
                {moment(date[0].startDate).format('MM/DD/YYYY')}
                <br />-<br />
                {/* {format(new Date(date[0].endDate), 'MM/dd/yyyy')} */}
                {moment(date[0].endDate).format('MM/DD/YYYY')}
              </p>
            </div>
            <div className="customized-data">
              <p className="h-6-a">Number of days appeared:</p>
              <p className="h-6-a">{myTimeSheet.numOfDaysAppeared}</p>
              <p className="h-6-a">Days Appeared:</p>
              <p className="h-6-a days-appeared">
                <p
                  className="header"
                  onClick={() => toggleCollapsible(!collapsible)}
                >
                  click to {!collapsible ? `expand` : 'collapse'}
                </p>
                {collapsible && (
                  <ol className="content">
                    {myTimeSheet.daysAppeared.map((day) => (
                      <li>
                        {/* {format(new Date(day), 'MM/dd/yyyy')} */}
                        {moment(day.arrivalTime).format('MM-DD-YYYY')}
                      </li>
                    ))}
                  </ol>
                )}
              </p>
              <p className="h-6-a">Hours worked:</p>
              <p className="h-6-a">
                {Math.round(myTimeSheet.minutesWorked / 60)}
              </p>
              <p className="h-6-a">Total salary:</p>
              <p className="h-6-a">{myTimeSheet.totalSalary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  report: state.report,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getToday,
  getMyTimeSheet,
  setArrival,
  setDeparture,
})(EmployeeDashboard);
