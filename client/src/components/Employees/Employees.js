import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PaperProfile } from '../Profile/Profile';
import Loading from '../Loading/Loading';
import { connect } from 'react-redux';
import { getUsers } from '../../redux/actions/user';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '40px 0',
  },
  paper: {
    padding: '20px 30px',
  },
  container: {
    padding: '70px 0',
  },
  search: {
    width: '100%',
  },
  card: {
    width: '100%',
  },
  wrapper: {
    padding: '20px 15px',
  },
}));

const Employees = ({ loggedInUser, user: { users, loading }, getUsers }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    document.title = 'Employees | DeDev Technologies';
    getUsers();

    console.log(users);
  }, [getUsers]);

  return loading ? (
    <Loading />
  ) : (
    <Container maxWidth="md" className={classes.root}>
      {users.map((user, idx) => (
        <PaperProfile
          key={idx}
          name={user.name}
          bio={user.bio}
          skills={user.skills}
          userId={user._id}
          showEditBtn={
            user.admin || user._id === loggedInUser._id ? true : false
          }
        />
      ))}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  loggedInUser: state.auth.user,
});

export default connect(mapStateToProps, { getUsers })(Employees);
