import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { PaperProfile } from '../Profile/Profile';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/user';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  h_3: {
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  h_1_a: {
    fontSize: '2.52rem',
    fontWeight: 'bold',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, San Francisco, Helvetica Neue, Helvetica, Ubuntu, Roboto, Noto, Segoe UI, Arial, sans-serif',
    marginBottom: '7px',
  },
  paper: {
    padding: '20px 30px',
  },
  container: {
    padding: '70px 0',
  },
  input: {
    width: '100%',
  },
  btn: {
    padding: '0px 8px',
    display: 'grid',
    justifyItems: 'end',
  },
}));

const EditProfile = ({ auth: { user, loading }, updateUser, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    skills: '',
    salary: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    skills: '',
    salary: '',
    admin: null,
  });

  useEffect(() => {
    setFormData({
      name: loading || !user.name ? '' : user.name.split('_').join(' '),
      email: loading || !user.email ? '' : user.email,
      password: loading || !user.password ? '' : '',
      bio: loading || !user.bio ? '' : user.bio,
      skills: loading || !user.skills ? '' : user.skills.join(', '),
      salary: loading || !user.salary ? '' : user.salary,
      admin: loading || !user.admin ? false : user.admin,
    });
  }, [user]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // on submit handler
  const onSubmit = async (e) => {
    const errorObj = {};
    const twoParts = formData.email.split('@');
    const fourParts = twoParts[1] ? twoParts[1].split('.') : ['', ''];
    const eachPart = fourParts[1] ? fourParts : ['', ''];

    for (let [key, value] of Object.entries(formData)) {
      if (value.length === 0) {
        errorObj[key] = `${key.charAt(0).toUpperCase()}${key.slice(
          1
        )} is required`;
        console.log(1);
      } else if (key === 'name' && value.length < 2) {
        errorObj[key] = `Name must be at least 2 characters`;
        console.log(2);
      } else if (key === 'password' && value.length < 6) {
        errorObj[key] = `Password must be at least 6 characters`;
        console.log(3);
      } else if (
        (key === 'email' && !value.includes('@')) ||
        eachPart[0].length < 2 ||
        eachPart[1].length < 2
      ) {
        errorObj.email = 'Invalid email';
        console.log(4);
      }
    }

    if (errorObj.email || errorObj.password || errorObj.name) {
      setErrors({
        ...errors,
        name: errorObj.name ? errorObj.name : '',
        email: errorObj.email ? errorObj.email : '',
        password: errorObj.password ? errorObj.password : '',
      });
    } else {
      updateUser(formData, user._id, history);
    }
  };

  // on blur handler
  const onBlur = (e) => {
    const twoParts = formData.email.split('@');
    const fourParts = twoParts[1] ? twoParts[1].split('.') : ['', ''];
    const eachPart = fourParts[1] ? fourParts : ['', ''];

    if (e.target.value.length === 0) {
      setErrors({
        ...errors,
        [e.target.name]: `${e.target.name
          .charAt(0)
          .toUpperCase()}${e.target.name.slice(1)} is required`,
      });
      console.log(5);
    } else if (e.target.name === 'name' && e.target.value.length < 2) {
      setErrors({
        ...errors,
        name: `Name must be at least 2 characters`,
      });
      console.log(6);
    } else if (e.target.name === 'password' && e.target.value.length < 6) {
      setErrors({
        ...errors,
        password: `Password must be at least 6 characters`,
      });
      console.log(7);
    } else if (
      (e.target.name === 'email' && !e.target.value.includes('@')) ||
      eachPart[0].length < 2 ||
      eachPart[1].length < 2
    ) {
      setErrors({ ...errors, email: `Invalid email` });
      console.log(8);
    }
  };

  // on focus handler
  const onFocus = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
  };
  return (
    <Box>
      {/* spacing={2} means 8 * 2 = 16px */}
      <Container spacing={2} maxWidth="md" className={classes.container}>
        {!loading && user.name && (
          <PaperProfile
            name={user.name}
            bio={
              user.bio ? (
                user.bio
              ) : (
                <Button
                  variant="outlined"
                  // color="primary"
                  size="medium"
                >
                  add bio
                </Button>
              )
            }
            skills={user.skills}
          />
        )}

        <Grid container xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.h_3} paragraph>
              Edit Profile
            </Typography>
            <Grid spacing={2} container xl={12}>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.input}
                  error={errors.name ? true : false}
                  label="Name"
                  value={formData.name}
                  helperText={errors.name && errors.name}
                  variant="filled"
                  name="name"
                  onChange={(e) => onChange(e)}
                  onBlur={(e) => onBlur(e)}
                  onFocus={(e) => onFocus(e)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.input}
                  error={errors.email ? true : false}
                  label="Email"
                  value={formData.email}
                  helperText={errors.email && errors.email}
                  variant="filled"
                  name="email"
                  onChange={(e) => onChange(e)}
                  onBlur={(e) => onBlur(e)}
                  onFocus={(e) => onFocus(e)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.input}
                  error={errors.password ? true : false}
                  label="Password"
                  type="Password"
                  value={formData.password}
                  helperText={errors.password && errors.password}
                  variant="filled"
                  name="password"
                  onChange={(e) => onChange(e)}
                  onBlur={(e) => onBlur(e)}
                  onFocus={(e) => onFocus(e)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.input}
                  error={errors.salary ? true : false}
                  label="Salary"
                  type="number"
                  value={formData.salary}
                  helperText={errors.salary && errors.salary}
                  variant="filled"
                  name="salary"
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  error={errors.bio ? true : false}
                  label="Bio"
                  value={formData.bio}
                  placeholder="e.g. creates beautiful Reactjs UIs"
                  helperText={errors.bio && errors.bio}
                  variant="filled"
                  name="bio"
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  error={errors.skills ? true : false}
                  label="Skills"
                  type="text"
                  value={formData.skills}
                  helperText={errors.skills && errors.skills}
                  variant="filled"
                  name="skills"
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12} className={classes.btn}>
                <Button
                  variant="outlined"
                  // color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={(e) => onSubmit()}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateUser })(
  withRouter(EditProfile)
);
