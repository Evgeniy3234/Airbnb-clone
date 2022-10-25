const { sign } = require('jsonwebtoken');

// Create tokens
// ----------------------------------
const createAccessToken = (userId) => sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
  expiresIn: '15m',
});

const createRefreshToken = (userId) => sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
  expiresIn: '7d',
});

// Send tokens
// ----------------------------------
const sendAccessToken = (req, res, accesstoken) => {
  res.send({
    accesstoken,
    email: req.body.email,
  });
};

const sendRefreshToken = (res, refreshtoken) => {
  res.cookie('refreshtoken', refreshtoken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};