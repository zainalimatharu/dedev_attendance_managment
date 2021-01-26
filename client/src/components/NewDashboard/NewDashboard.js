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
import ReportTable from './ReportTable';

// importing require redux actions
import { setOpenPage } from '../../redux/actions/navigation';
import { getMyReport, setReportLoading } from '../../redux/actions/report';

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

const Dashboard = ({
  auth: { user },
  setOpenPage,
  getMyReport,
  setReportLoading,
}) => {
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
    document.title = 'Dashboard | DeDev Technologies';
    setOpenPage('dashboard');
  }, []);

  const today = {
    gte: moment().startOf('day').utc(true)._d,
    lte: moment().endOf('day').utc(true)._d,
  };

  const thisMonth = {
    gte: moment().startOf('month').utc(true),
    lte: moment().endOf('day').utc(true),
  };

  const applyFilter = () => {
    setReportLoading(true);
    getMyReport({
      userId: user._id,
      gte: moment(date[0].startDate).startOf('day').utc(true),
      lte: moment(date[0].endDate).endOf('day').utc(true),
      message: 'Record Not Found',
    });
  };

  return (
    <div className={root}>
      <p className={heading}>Dashboard</p>
      <Options
        date={date}
        setDate={setDate}
        setOpenTab={setOpenTab}
        openTab={openTab}
        applyFilter={applyFilter}
      />
      {openTab === 'today' && (
        <ReportTable timeSpan={today} openTab={openTab} />
      )}
      {openTab === 'thisMonth' && (
        <ReportTable timeSpan={thisMonth} openTab={openTab} />
      )}
      {openTab === 'customized' && (
        <ReportTable setLoading={true} openTab={openTab} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setOpenPage,
  getMyReport,
  setReportLoading,
})(Dashboard);
