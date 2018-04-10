import jwt from 'jsonwebtoken';
import db from '../models/index';

const dbUser = db.users;
const secretkey = 'weconnect-member';

class LoginStatus {
  static checkLoginStatus(req, res, next) {
    const tokens = req.headers.token;
    const decode = jwt.decode(tokens, { complete: true });
    const userID = decode.payload.id;
    if (userID !== ' ') {
      dbUser.findOne({
        attributes: ['id', 'username'],
        where: {
          id: userID
        }
      }).then((userFound) => {
        let jwtVerification;
        try {
          jwtVerification = jwt.verify(req.token, secretkey);
        } catch (error) {
          return res.status(400).send({ status: 'failed', message: 'Unauthorized user, please login again' });
        }
        if (jwtVerification === ' ') {
          return res.status(401).send({ status: 'failed', message: 'Please login again' });
        }
        if (jwtVerification !== ' ' && userFound.id !== ' ') {
          req.body.userID = userFound.id;
          next();
        }
      });
    }
  }
}

export default LoginStatus;
