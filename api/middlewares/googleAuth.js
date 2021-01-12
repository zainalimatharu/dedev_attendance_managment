const path = require('path');
const { GoogleAuth } = require('google-auth-library');

const authenticate = (scopes) => {
  const auth = new GoogleAuth({
    keyFile: path.resolve(__dirname, 'sacredentials.json'),
    scopes,
  });

  return auth;
};

module.exports = authenticate;
