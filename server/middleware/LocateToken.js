class LocateToken {
  static findToken(req, res, next) {
    req.token = req.headers.token;
    if (req.token === undefined) {
      return res.status(400).send({ status: 'failed', message: 'Token not found, please login again' });
    }
    next();
  }
}

export default LocateToken;
