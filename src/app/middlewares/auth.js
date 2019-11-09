const jwt = require('express-jwt');
const auth = require('../../config/auth')

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

module.exports = jwt({
  secret: auth.secret,
  userProperty: 'token',
  getToken: getTokenFromHeaders,
});