const jwt = require('jsonwebtoken');

const secret = 'myCat';
const payload = {
  sub: 1,
  role: 'customer'
}

function signToken(payload, secret){
  return jwt.sign(payload, secret);
  // .sign() para generar el token
}

const token = signToken(payload, secret);
// console.log(token);
