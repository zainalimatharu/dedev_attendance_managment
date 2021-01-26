// importing react stuff
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

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
  getCustomizedReport,
  setReportLoading,
} from '../../redux/actions/report';

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
  report: { customizedReport, loading },
  getCustomizedReport,
  clearReport,
  setReportLoading,
  timeSpan,
}) => {
  const { root, table, tableContainer, tableHead, tableHeading } = useStyles();
  const { tableData, pagination } = useStyles();

  const rowsPerPage = 5;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);

  useEffect(() => {
    if (!loading && customizedReport)
      setNoOfPages(Math.ceil(customizedReport.length / rowsPerPage));
  }, [customizedReport]);

  useEffect(() => {
    if (timeSpan) {
      getCustomizedReport({
        gte: timeSpan.gte,
        lte: timeSpan.lte,
      });
    } else {
      setReportLoading(false);
    }

    return function cleanUp() {
      clearReport();
    };
  }, [getCustomizedReport, clearReport]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const row = (user, idx) => (
    <TableRow key={idx}>
      <TableCell className={tableData}>{user.name}</TableCell>
      <TableCell className={tableData} align="center">
        {user.present.length}
      </TableCell>
      <TableCell className={tableData} align="center">
        {user.leave.length}
      </TableCell>
      <TableCell className={tableData} align="right">
        {user.absent.length}
      </TableCell>
      <TableCell className={tableData} align="right">
        view details
      </TableCell>
    </TableRow>
  );

  return loading ? (
    <Loading />
  ) : (
    <div className={root}>
      <TableContainer
        component={Paper}
        className={tableContainer}
        elevation={0}
        square
      >
        <Table className={table} aria-label="simple table">
          <TableHead className={tableHead}>
            <TableRow>
              <TableCell className={tableHeading}>Name</TableCell>
              <TableCell className={tableHeading} align="center">
                Presents
              </TableCell>
              <TableCell className={tableHeading} align="center">
                Leaves
              </TableCell>
              <TableCell className={tableHeading} align="right">
                Absents
              </TableCell>
              <TableCell className={tableHeading} align="right">
                details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customizedReport &&
              customizedReport
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((user, idx) => row(user, idx))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container className={pagination}>
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChangePage}
          defaultPage={1}
        />
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  report: state.report,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCustomizedReport,
  clearReport,
  setReportLoading,
})(ReportTable);
