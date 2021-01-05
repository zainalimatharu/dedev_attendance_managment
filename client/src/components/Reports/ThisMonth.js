import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  getCustomizedReport,
  clearCustomizedReport,
} from '../../redux/actions/report';
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
  thisMonth: {
    margin: '60px 0',
  },
  heading: {
    color: '#666',
    marginBottom: '25px',
  },
  tableHead: {
    backgroundColor: '#e4eaee',
    borderBottom: '1px solid #c6d2d9',
  },
  tableHeading: {
    fontWeight: 'bold',
    color: '#333',
  },
}));

const ThisMonth = ({
  getCustomizedReport,
  clearCustomizedReport,
  report: { loading, customizedReport },
}) => {
  const classes = useStyles();

  useEffect(() => {
    getCustomizedReport({
      gte: moment().startOf('month').utc(true),
      lte: moment().endOf('day').utc(true),
    });

    return function cleanUp() {
      clearCustomizedReport();
    };
  }, [getCustomizedReport]);

  return loading ? (
    <h1>loading...</h1>
  ) : (
    <div className={classes.thisMonth}>
      <Typography variant="h5" gutterBottom className={classes.heading}>
        This Month
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.tableHeading}>Name</TableCell>
              <TableCell align="right" className={classes.tableHeading}>
                Presents
              </TableCell>
              <TableCell align="right" className={classes.tableHeading}>
                Absents
              </TableCell>
              <TableCell align="right" className={classes.tableHeading}>
                Leaves
              </TableCell>
              <TableCell align="right" className={classes.tableHeading}>
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              customizedReport &&
              customizedReport.map((user) => (
                <ThisMonthItem key={user._id} user={user} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const ThisMonthItem = ({ user }) => {
  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        {user.name.replace('_', ' ')}
      </TableCell>
      <TableCell align="right">{user.present.length}</TableCell>
      <TableCell align="right">{user.absent.length}</TableCell>
      <TableCell align="right">{user.leave.length}</TableCell>
      <TableCell align="right">view details</TableCell>
    </TableRow>
  );
};

const mapStateToProps = (state) => ({
  report: state.report,
});

export default connect(mapStateToProps, {
  getCustomizedReport,
  clearCustomizedReport,
})(ThisMonth);
