import React, { useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getTodayReport, clearTodayReport } from '../../redux/actions/report';
import {
  Typography,
  Table,
  TableRow,
  TableHead,
  Paper,
  TableContainer,
  TableCell,
  TableBody,
} from '@material-ui/core';

// apply custom styles to material-ui components
const useStyles = makeStyles((theme) => ({
  today: {
    margin: '60px 0',
  },
  heading: {
    color: '#666',
    marginBottom: '25px',
  },
  tableHead: {
    backgroundColor: '#e4eaee',
    fontWeight: 'bold',
    borderBottom: '1px solid #c6d2d9',
  },
  tableHeading: {
    fontWeight: 'bold',
    color: '#333',
  },
}));

const Today = ({
  getTodayReport,
  clearTodayReport,
  report: { loading, todayReport },
}) => {
  const classes = useStyles();

  useEffect(() => {
    getTodayReport();

    return function cleanUp() {
      clearTodayReport();
    };
  }, [getTodayReport]);

  return loading ? (
    <h1>loading...</h1>
  ) : (
    <div className={classes.today}>
      <Typography variant="h5" gutterBottom className={classes.heading}>
        Today
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className={`${classes.tableHead}`}>
            <TableRow>
              <TableCell className={classes.tableHeading}>Name</TableCell>
              <TableCell align="right" className={classes.tableHeading}>
                Status
              </TableCell>
              <TableCell align="right" className={classes.tableHeading}>
                Chek In
              </TableCell>
              <TableCell align="right" className={classes.tableHeading}>
                Check Out
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              todayReport &&
              todayReport.map((user) => (
                <ReportItem key={user._id} user={user} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const ReportItem = ({ user }) => {
  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        {user.name.replace('_', ' ')}
      </TableCell>
      <TableCell align="right">
        {user.today[0] ? 'Present' : user.today.leave ? 'Leave' : 'Absent'}
      </TableCell>
      <TableCell align="right">
        {user.today[0] &&
          moment(user.today[0].arrivalTime).utc().format('hh:mm A')}
      </TableCell>
      <TableCell align="right">
        {user.today[0] &&
          user.today[0].departureTime &&
          moment(user.today[0].departureTime).utc().format('hh:mm a')}
      </TableCell>
    </TableRow>
  );
};

const mapStateToProps = (state) => ({
  report: state.report,
});

export default connect(mapStateToProps, { getTodayReport, clearTodayReport })(
  Today
);
