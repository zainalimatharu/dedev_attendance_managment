// importing react stuff
import React, { useState } from 'react';
import moment from 'moment';

// importing material-ui stuff
import { Grid, Tooltip, Typography } from '@material-ui/core';
import { Fingerprint, AssignmentTurnedInOutlined } from '@material-ui/icons';

// importing material-ui classes
import useStyles from './styles';

const Snackbar = ({
  headerText,
  timeHeading,
  timeText,
  attendanceStatus,
  toolTipText,
  attendanceMethod,
  showAttendanceIcon,
  timeStayed,
}) => {
  // initialize material-ui classes
  const { header, content, time, beforeIcon, afterIcon } = useStyles();
  const { danger, info, snackbar, success } = useStyles();

  const [marking, setMarking] = useState(false);

  return (
    <Grid item xs={12} container className={snackbar}>
      <Grid item xs={12} container className={header}>
        <Grid item xs>
          {headerText}
        </Grid>
        <Grid item>
          <span>{timeHeading}</span>
          {showAttendanceIcon || !timeText ? (
            <input
              id="time"
              type="time"
              defaultValue={moment().format('HH:mm')}
              className={time}
            />
          ) : (
            <span className={`${time}`}>{timeText}</span>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} container className={content}>
        <Grid item>
          <AssignmentTurnedInOutlined
            className={`${beforeIcon} ${
              attendanceStatus === 'late'
                ? headerText === 'Arrived' || headerText === 'Not Arrived'
                  ? danger
                  : info
                : attendanceStatus === 'early'
                ? headerText === 'Arrived' || headerText === 'Not Arrived'
                  ? info
                  : danger
                : success
            }`}
          />
        </Grid>
        <Grid item xs>
          {`${!showAttendanceIcon ? headerText : ''} ${attendanceStatus}`}
        </Grid>
        {showAttendanceIcon && (
          <Grid item>
            {marking ? (
              <Typography variant="subtitle2">loading...</Typography>
            ) : (
              <Tooltip title={toolTipText} placement="left">
                <Fingerprint
                  className={afterIcon}
                  onClick={() => {
                    attendanceMethod();
                    setMarking(true);
                  }}
                />
              </Tooltip>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Snackbar;
