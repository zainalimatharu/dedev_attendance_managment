import { makeStyles } from '@material-ui/core/styles';

// defining material-ui classes
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    placeItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '20px',
    width: '20px',
  },
  heading: {
    fontSize: '1.554rem',
    color: '#666',
    fontWeight: '500',
    marginBottom: '35px',
  },
  subTitle: {
    color: '#333',
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5',
    marginBottom: '1.4286rem',
  },
  blockQoute: {
    fontWeight: '500',
    fontSize: '1.05rem',
    padding: '10px 20px',
  },
  status: {
    padding: '10px 20px',
    height: '100%',
  },
  snackbar: {
    marginBottom: '25px',
  },
  alert: {
    margin: '20px 0',
    width: '100%',
  },
  header: {
    padding: '6px 20px',
    backgroundColor: '#e4eaee',
    border: '1px solid #c6d2d9',
    color: '#999',
    fontSize: '.8571rem',
    alignItems: 'center',
  },
  total: {
    color: '#999',
    fontSize: '.8571rem',
  },
  content: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    border: '1px solid #c6d2d9',
    borderBottom: '5px solid #c6d2d9',
    marginTop: '-1px',
    alignItems: 'center',
    height: '58px',
  },
  time: {
    backgroundColor: 'transparent',
    border: 'none',
    marginLeft: '10px',
    color: '#333',
    fontSize: '1.1rem !important',
    fontFamily: 'Sans-Serif',
    fontWeight: '500',
  },
  beforeIcon: {
    margin: '4px 20px 0 0',
    fontSize: '1.1rem',
  },
  danger: {
    color: '#f44336',
  },
  info: {
    color: '#03a9f4',
  },
  success: {
    color: '#4caf50',
  },
  afterIcon: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#90a4ae',
    },
    borderRadius: '10px',
    transition: '0.35s',
    padding: '1px',
  },
});

export default useStyles;
