const jsonwebtoken = require('jsonwebtoken');

function ensureLoggedIn(req, res, next) {
  try {
    console.log('line 3');
    const token = req.headers.authorization;
    console.log(token);
    const decodedToken = jsonwebtoken.verify(token, 'CONTIGO');
    console.log('line 7');
    return next();
  } catch (err) {
    console.log(err);
    return res.json({ message: 'Unauthorized -- not logged in' });
  }
}

function ensureCorrectUser(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decodedToken = jsonwebtoken.verify(token, 'CONTIGO');
    if (decodedToken.id === +req.params.id) {
      return next();
    } else return res.json({ message: 'Unauthorized -- incorrect user' });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  ensureLoggedIn,
  ensureCorrectUser
};
