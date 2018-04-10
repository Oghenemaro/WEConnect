import jwt from 'jsonwebtoken';
import db from '../models/index';


const user = db.users;
const secretkey = 'weconnect-member';

class Users {
  static authentication(req) {
    const {
      username, password, email, firstname
    } = req.body;
    const token = jwt.sign({
      id: user.id, username, password, email, firstname
    }, secretkey, { expiresIn: 1440 });
    return token;
  }
  static createUser(req, res) {
    const {
      username, firstname, lastname, email, telephone, address, password
    } = req.body;
    if (password.length < 6) {
      return res.status(403).send('Password length must be more than 6');
    }
    return user.create({
      username,
      firstname,
      lastname,
      email,
      telephone,
      address,
      password,
      locationID: req.body.locationID
    }).then(() => res.status(200).send({ Status: 'successfull', message: 'Account Created' }))
      .catch(() => res.status(409).send({ Status: 'failed', message: 'A problem occured please try again' }));
  }

  static authenticateUser(req, res) {
    user.findOne({
      attributes: ['id', 'username', 'firstname', 'lastname', 'email', 'telephone', 'address', 'password'],
      where: {
        username: req.body.username
      }
    }).then((userFound) => {
      if (userFound === ' ') {
        return res.status(400).send({ status: 'failed', message: 'User not found' });
      } else if (userFound.password !== req.body.password) {
        return res.status(400).send({ status: 'failed', message: 'Incorrect username or password' });
      }
      const token = jwt.sign({ id: userFound.id, username: userFound.username, email: userFound.email }, secretkey, { expiresIn: 1440 });
      return res.status(200).send({ status: 'successfull', Token: token, message: `Welcome: ${userFound.username}` });
    })
      .catch(() => res.status(409).send({ Status: 'failed', message: 'A problem occured please try again' }));
  }
}

export default Users;

