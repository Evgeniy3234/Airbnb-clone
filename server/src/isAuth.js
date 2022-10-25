const { verify } = require('jsonwebtoken');

const isAuth = (req) => {
  const auth = req.headers.cookie;
  if (!auth) throw new Error('You need to login.');
  const token = auth.split('=')[1];
  let payload = null;
  payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  const { userId } = payload;
  return userId;
};

module.exports = {
  isAuth,
};
