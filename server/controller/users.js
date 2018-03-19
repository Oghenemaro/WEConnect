import db from '../models/index';

const user = db.users;

class users {
  static createUser(req, res) {
    const {
      username, firstname, lastname, email, telephone, address, password
    } = req.body;
    if (password.length < 6) {
      return res.status(403).send('Password length must be more than 6');
    }
    return user.create({
      username, firstname, lastname, email, telephone, address, password
    }).then(() => res.status(200).send({ Status: 'successfull', message: 'Account Created' }))
      .catch(() => res.status(409).send({ Status: 'failed', message: 'A problem occured please try again' }));
  }
}

export default users;

