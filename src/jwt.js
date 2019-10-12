const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

module.exports.verifyJwtToken = (req, res, next) => {
  let token;
  if ('authorization' in req.headers)
    token = req.headers['authorization'].split(' ')[1];

  if (!token)
    return res.status(403).send({ auth: false });
  else {
    jwt.verify(token, JWT_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
        else {
          req.user = { ...decoded, password: undefined };
          next();
        }
      }
    )
  }
}

module.exports.renewToken = (jwtToken) => {
  const verifiedToken = jwt.verify(jwtToken, JWT_SECRET);
  return jwt.sign(verifiedToken, JWT_SECRET, { JWT_EXP });
};

module.exports.verifyPassword = (user, password) => bcrypt.compareSync(password, user.password);

module.exports.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

module.exports.generateJwt = (user) => jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXP });