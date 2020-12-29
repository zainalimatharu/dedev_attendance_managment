import React, { useState, useEffect } from 'react';
import './style.css';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';

// importing utilities
import { validateOnBlur, validateOnSubmit } from '../../utilities/validation';

const Login = ({ auth: { loading }, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    document.title = 'Login | DeDev Technologies';
  }, []);

  // on change handler
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // on submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    const errorObj = validateOnSubmit(formData);

    if (errorObj.email || errorObj.password) {
      setErrors({
        ...errors,
        email: errorObj.email ? errorObj.email : '',
        password: errorObj.password ? errorObj.password : '',
      });
    } else {
      login(formData);
    }
  };

  // on blur handler
  const onBlur = (e) => {
    validateOnBlur(e.target.name, formData, errors, setErrors);
  };

  // on focus handler
  const onFocus = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return loading ? (
    'loading...'
  ) : (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-heading-md">
          <div className="login-inner-wraper">
            <h1 className="h-2-a" style={{ margin: '20px 0 50px 0' }}>
              Login
            </h1>
            <p>Login & Explore!</p>
          </div>
        </div>
        <div className="login-heading-xs">
          <div className="login-inner-wraper">
            <h1 className="h-2-a">Login</h1>
            <p>Login & Explore!</p>
          </div>
        </div>
        <div className="login-form">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label>Email:*</label>
              <input
                type="email"
                name="email"
                onChange={(e) => onChange(e)}
                onBlur={(e) => onBlur(e)}
                onFocus={(e) => onFocus(e)}
                value={formData.email}
              />
              <p className="error-message">{errors.email}</p>
            </div>
            <div className="form-group">
              <label>Password:*</label>
              <input
                type="password"
                name="password"
                onChange={(e) => onChange(e)}
                onBlur={(e) => onBlur(e)}
                onFocus={(e) => onFocus(e)}
                value={formData.password}
              />
              <p className="error-message">{errors.password}</p>
            </div>
            <div className="">
              <input type="submit" value="Log In" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
