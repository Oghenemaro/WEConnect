import jwt from 'jsonwebtoken';
import db from '../models/index';

const dbUser = db.users;
const secretkey = 'weconnect-member';

class LoginStatus {
  static userIdentification(req) {
    const tokens = req.headers.token;
    const decode = jwt.decode(tokens, { complete: true });
    const userID = decode.payload.id;
    return userID;
  }
  static checkLoginStatus(req, res, next) {
    const tokens = req.headers.token;
    if (tokens !== ' ') {
      let jwtVerification;
      try {
        jwtVerification = jwt.verify(tokens, secretkey);
      } catch (error) {
        return res.status(401).send({ status: 'failed', message: 'Invalid Token. Login to application again' });
      }
      if (jwtVerification === undefined) {
        return res.status(400).send({ status: 'failed', message: 'Please login' });
      }
      const decode = jwt.decode(tokens, { complete: true });
      const userID = decode.payload.id;
      dbUser.findOne({
        attributes: ['id', 'username'],
        where: {
          id: userID
        }
      }).then((userFound) => {
        if (jwtVerification !== ' ' && userFound.id !== ' ') {
          req.body.userID = userFound.id;
          next();
        }
      });
    } else if (tokens === undefined) {
      return res.status(401).send({ satus: 'failed', message: 'You are not logged in. Login in' });
    }
  }
}

export default LoginStatus;
