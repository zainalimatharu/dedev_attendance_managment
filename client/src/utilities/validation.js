const validateOnBlur = (elmName, formData, errors, setErrors) => {
  const twoParts = formData.email.split('@');
  const fourParts = twoParts[1] ? twoParts[1].split('.') : ['', ''];
  const eachPart = fourParts[1] ? fourParts : ['', ''];

  if (formData[elmName].length === 0) {
    setErrors({
      ...errors,
      [elmName]: `${elmName.charAt(0).toUpperCase()}${elmName.slice(
        1
      )} is required`,
    });
    console.log(5);
  } else if (elmName === 'name' && formData[elmName].length < 2) {
    setErrors({
      ...errors,
      name: `Name must be at least 2 characters`,
    });
    console.log(6);
  } else if (elmName === 'password' && formData[elmName].length < 6) {
    setErrors({
      ...errors,
      password: `Password must be at least 6 characters`,
    });
    console.log(7);
  } else if (
    (elmName === 'email' && !formData[elmName].includes('@')) ||
    eachPart[0].length < 2 ||
    eachPart[1].length < 2
  ) {
    setErrors({ ...errors, email: `Invalid email` });
    console.log(8);
  }
};

const validateOnSubmit = (formData) => {
  const errors = {};
  const twoParts = formData.email.split('@');
  const fourParts = twoParts[1] ? twoParts[1].split('.') : ['', ''];
  const eachPart = fourParts[1] ? fourParts : ['', ''];

  for (let [key, value] of Object.entries(formData)) {
    if (value.length === 0) {
      errors[key] = `${key.charAt(0).toUpperCase()}${key.slice(1)} is required`;
      console.log(1);
    } else if (key === 'name' && value.length < 2) {
      errors[key] = `Name must be at least 2 characters`;
      console.log(2);
    } else if (key === 'password' && value.length < 6) {
      errors[key] = `Password must be at least 6 characters`;
      console.log(3);
    } else if (
      (key === 'email' && !value.includes('@')) ||
      eachPart[0].length < 2 ||
      eachPart[1].length < 2
    ) {
      errors.email = 'Invalid email';
      console.log(4);
    }
  }

  return errors;
};

export { validateOnBlur, validateOnSubmit };
