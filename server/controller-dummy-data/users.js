import users from '../model-dummy-data/mUsers';

class UsersController {
  static getUsers(req, res) {
    return res.status(200).json({ Users: users });
  }
}

export default UsersController;
