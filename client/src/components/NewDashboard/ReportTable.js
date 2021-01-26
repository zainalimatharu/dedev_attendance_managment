// importing react stuff
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// importing material-ui stuff
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

// importing components
import Loading from '../Loading/Loading';

// importing required redux actions
import {
  clearReport,
  getMyReport,
  setReportLoading,
} from '../../redux/actions/report';
import NoData from '../NoData/NoData';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tableContainer: {
    marginTop: '35px',
  },
  table: {
    border: '1px solid #c6d2d9',
  },
  tableHead: {
    backgroundColor: '#e4eaee',
  },
  tableHeading: {
    fontWeight: '600',
    '@media (max-width: 768px)': {
      fontSize: '0.6rem',
    },
  },
  tableCell: {
    '@media (max-width: 768px)': {
      fontSize: '0.6rem',
    },
  },
  tableData: {
    '@media (max-width: 768px)': {
      fontSize: '0.6rem',
    },
  },
  pagination: {
    justifyContent: 'flex-end',
    marginTop: '15px',
  },
});

const ReportTable = ({
  report: {
    me: { myReport },
    loading,
  },
  getMyReport,
  clearReport,
  setReportLoading,
  auth: { user },
  timeSpan,
}) => {
  const { root, table, tableContainer, tableHead, tableHeading } = useStyles();
  const { tableData, pagination } = useStyles();

  const rowsPerPage = 5;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);

  useEffect(() => {
    if (!loading && myReport && myReport.daysAppeared)
      setNoOfPages(Math.ceil(myReport.daysAppeared.length / rowsPerPage));
  }, [myReport]);

  useEffect(() => {
    if (timeSpan) {
      getMyReport({
        userId: user._id,
        gte: timeSpan.gte,
        lte: timeSpan.lte,
        message: 'Record Not Found',
      });
    } else {
      setReportLoading(false);
    }

    return function cleanUp() {
      clearReport();
      console.log('unmounting');
    };
  }, [getMyReport, clearReport]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const row = (day, idx) => (
    <TableRow key={idx}>
      <TableCell className={tableData}>
        {moment(day.date).format('ddd - MMM DD, YYYY')}
      </TableCell>
      <TableCell className={tableData} align="center">
        {day.absent ? 'Absent' : day.leave ? 'Leave' : 'Present'}
      </TableCell>
      <TableCell className={tableData} align="center">
        {moment(day.arrivalTime).utc().format('hh:mm A')}
      </TableCell>
      <TableCell className={tableData} align="right">
        {day.departureTime
          ? moment(day.departureTime).utc().format('hh:mm A')
          : '--'}
      </TableCell>
    </TableRow>
  );

  return loading ? (
    <Loading />
  ) : (
    <div className={root}>
      {myReport && myReport.daysAppeared ? (
        <>
          <TableContainer
            component={Paper}
            className={tableContainer}
            elevation={0}
            square
          >
            <Table className={table} aria-label="simple table">
              <TableHead className={tableHead}>
                <TableRow>
                  <TableCell className={tableHeading}>Date</TableCell>
                  <TableCell className={tableHeading} align="center">
                    Status
                  </TableCell>
                  <TableCell className={tableHeading} align="center">
                    Check In
                  </TableCell>
                  <TableCell className={tableHeading} align="right">
                    Check Out
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myReport.daysAppeared
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  .map((day, idx) => row(day, idx))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container className={pagination}>
            <Pagination
              defaultPage={1}
              count={noOfPages}
              page={page}
              onChange={handleChangePage}
              defaultPage={1}
            />
          </Grid>
        </>
      ) : (
        !loading && !myReport && <NoData text="No Record Found" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  report: state.report,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getMyReport,
  clearReport,
  setReportLoading,
})(ReportTable);
