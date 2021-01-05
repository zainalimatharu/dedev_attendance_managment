import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  getCustomizedReport,
  clearCustomizedReport,
  setReportLoading,
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
  filter: {
    backgroundColor: '#03a9f4',
    padding: '10px 20px',
    color: 'white',
    cursor: 'pointer',
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

const Customized = ({
  date,
  getCustomizedReport,
  clearCustomizedReport,
  setReportLoading,
  report: { loading, customizedReport },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setReportLoading(false);

    return function cleanUp() {
      clearCustomizedReport();
    };
  }, [setReportLoading]);

  const applyFilter = () => {
    setReportLoading(true);
    getCustomizedReport({
      gte: moment(date[0].startDate).startOf('day').utc(true)._d,
      lte: moment(date[0].endDate).endOf('day').utc(true)._d,
    });
  };

  return (
    <div className={classes.thisMonth}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
        <Typography variant="h5" gutterBottom className={classes.heading}>
          CUSTOMIZED REPORT
        </Typography>
        <span>
          <Typography
            variant="button"
            gutterBottom
            className={classes.filter}
            onClick={() => applyFilter()}
          >
            APPLY FILTER
          </Typography>
        </span>
      </div>
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
            {loading ? (
              <h1>Loading..</h1>
            ) : (
              customizedReport &&
              customizedReport.map((user) => (
                <CustomizedItem key={user._id} user={user} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const CustomizedItem = ({ user }) => {
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
  setReportLoading,
})(Customized);
