import users from '../model-dummy-data/mUsers';

class UsersController {
  static getUsers(req, res) {
    if (req) {
      return res.status(200).json({ Users: users });
    }
  }

  static createUser(req, res) {
    if (req.body) {
      users.push({
        id: users.length + 1,
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        telephone: req.body.telephone,
        address: req.body.address
      });
      res.status(200).json({ message: 'User Account Created' });
    } else {
      return res.status(400).json({ message: 'Request is empty' });
    }
  }
}

export default UsersController;
