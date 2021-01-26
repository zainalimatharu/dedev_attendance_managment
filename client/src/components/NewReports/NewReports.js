// importing react stuff
import React, { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
import { connect } from 'react-redux';

// importing material-ui stuff
import { makeStyles } from '@material-ui/core/styles';

// importing components
import Options from '../Options/Options';
import Today from './Today';
import ReportTable from './ReportTable';

// importing required redux actions
import { setOpenPage } from '../../redux/actions/navigation';
import {
  getCustomizedReport,
  getTodayReport,
  setReportLoading,
} from '../../redux/actions/report';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: '1.554rem',
    color: '#666',
    fontWeight: '500',
    marginBottom: '35px',
  },
});

const NewReports = ({ setOpenPage, getCustomizedReport, setReportLoading }) => {
  const { root, heading } = useStyles();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: moment().startOf('day')._d,
      key: 'selection',
    },
  ]);

  const [openTab, setOpenTab] = useState('today');

  // useEffect hook to set navigation openTab & document title
  useEffect(() => {
    document.title = 'Reports | DeDev Technologies';
    setOpenPage('reports');
  }, []);

  const thisMonth = {
    gte: moment().startOf('month').utc(true),
    lte: moment().endOf('day').utc(true),
  };

  const applyFilter = () => {
    setReportLoading(true);
    getCustomizedReport({
      gte: moment(date[0].startDate).startOf('day').utc(true),
      lte: moment(date[0].endDate).endOf('day').utc(true),
    });
  };

  return (
    <div className={root}>
      <p className={heading}>Employees' Reports</p>
      <Options
        date={date}
        setDate={setDate}
        setOpenTab={setOpenTab}
        openTab={openTab}
        applyFilter={applyFilter}
      />
      {openTab === 'today' && <Today getTodayReport={getTodayReport} />}
      {openTab === 'thisMonth' && <ReportTable timeSpan={thisMonth} />}
      {openTab === 'customized' && <ReportTable />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setOpenPage,
  getCustomizedReport,
  setReportLoading,
})(NewReports);
