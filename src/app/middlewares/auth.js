const jwt = require('express-jwt');
const auth = require('../../config/auth')

const getTokenFromHeaders = (req) => {
  console.log("TITITITITITITRI")
  const { headers: { authorization } } = req;
  console.log("REQ do Token")
  console.log(req.headers.authorization)
  console.log(authorization)
  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

// const auth = {
//   required: jwt({
//     secret: 'secret',
//     userProperty: 'payload',
//     getToken: getTokenFromHeaders,
//   }),
//   optional: jwt({
//     secret: 'secret',
//     userProperty: 'payload',
//     getToken: getTokenFromHeaders,
//     credentialsRequired: false,
//   }),
// };

module.exports = jwt({
  secret: auth.secret,
  userProperty: 'token',
  getToken: getTokenFromHeaders,
});