const INVALID = (field) => `Not a valid ${field}.`;
const REQUIRED = (field) => `${field} is required.`;
const MINMAX = (field, min, max) =>
  `${field} must be min ${min}, max ${max} charcters.`;
const GL = (field1, gl, field2) => `${field1} must be ${gl} than ${field2}.`;

module.exports = { INVALID, REQUIRED, MINMAX, GL };
