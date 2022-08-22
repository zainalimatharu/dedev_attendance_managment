// importing react stuff
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

// importing required redux actions
import { getTodayReport, clearReport } from "../../redux/actions/report";

// importing required components
import Loading from "../Loading/Loading";

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
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tableContainer: {
    marginTop: "35px",
  },
  table: {
    border: "1px solid #c6d2d9",
  },
  tableHead: {
    backgroundColor: "#e4eaee",
  },
  tableHeading: {
    fontWeight: "600",
    "@media (max-width: 768px)": {
      fontSize: "0.6rem",
    },
  },
  tableCell: {
    "@media (max-width: 768px)": {
      fontSize: "0.6rem",
    },
  },
  tableData: {
    "@media (max-width: 768px)": {
      fontSize: "0.6rem",
    },
  },
  pagination: {
    justifyContent: "flex-end",
    marginTop: "15px",
  },
});

const Today = ({
  report: { loading, todayReport },
  getTodayReport,
  clearReport,
}) => {
  const { root, table, tableContainer, tableHead, tableHeading } = useStyles();
  const { tableData, pagination } = useStyles();

  const rowsPerPage = 5;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);

  useEffect(() => {
    if (!loading && todayReport)
      setNoOfPages(Math.ceil(todayReport.length / rowsPerPage));
  }, [todayReport]);

  useEffect(() => {
    getTodayReport();

    return function cleanUp() {
      clearReport();
    };
  }, [getTodayReport, clearReport]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const row = (user, idx) => (
    <TableRow key={idx}>
      <TableCell className={tableData}>{user.name}</TableCell>
      <TableCell className={tableData} align="center">
        {user.today
          ? user.today.absent
            ? "Present"
            : user.today.leave
            ? "Leave"
            : "Present"
          : "Not Arrived Yet"}
      </TableCell>
      <TableCell className={tableData} align="center">
        {user.today
          ? moment(user.today.arrivalTime).utc().format("hh:mm A")
          : "--"}
      </TableCell>
      <TableCell className={tableData} align="right">
        {user.today && user.today.departureTime
          ? moment(user.departureTime).utc().format("hh:mm A")
          : "--"}
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
            {todayReport &&
              todayReport
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((user, idx) => row(user, idx))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container className={pagination}>
        <Pagination
          defaultPage={1}
          count={noOfPages}
          page={page}
          onChange={handleChangePage}
        />
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  report: state.report,
});

export default connect(mapStateToProps, { getTodayReport, clearReport })(Today);
