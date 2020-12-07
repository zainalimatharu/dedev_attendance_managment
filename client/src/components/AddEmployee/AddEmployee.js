import React, { useState } from 'react';
// import './style.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  // on change handler
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // on submit handler
  const onSubmit = async (e) => {
    e.preventDefault();

    const errorObj = {};
    const twoParts = formData.email.split('@');
    const fourParts = twoParts[1] ? twoParts[1].split('.') : ['', ''];

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
        fourParts[0].length < 2 ||
        fourParts[1].length < 2
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
      console.log(formData);
    }
  };

  // on blur handler
  const onBlur = (e) => {
    const twoParts = formData.email.split('@');
    const fourParts = twoParts[1] ? twoParts[1].split('.') : ['', ''];

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
      fourParts[0].length < 2 ||
      fourParts[1].length < 2
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
    <div className="login">
      <div className="container">
        <div className="login-heading">
          <div className="wrapper">
            <div className="inner-wrapper">
              <h1
                className="h-2-a"
                style={{ textAlign: 'center', marginBottom: '30px' }}
              >
                Add an Employee
              </h1>
              <p style={{ textAlign: 'center' }}>
                Provide employee's details &<br />
                Register an employee!
              </p>
            </div>
          </div>
        </div>
        <div className="login-form">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label>Name:*</label>
              <input
                type="text"
                name="name"
                onChange={(e) => onChange(e)}
                onBlur={(e) => onBlur(e)}
                onFocus={(e) => onFocus(e)}
                value={formData.name}
              />
              <p className="error-message">{errors.name}</p>
            </div>
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
              <input type="submit" value="Add Employee" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
