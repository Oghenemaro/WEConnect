import users from '../model-dummy-data/users';

class UsersController {
  static getUsers(req, res) {
    if (req) {
      return res.status(200).json({
        Users: users
      });
    }
  }


  static createUser(req, res) {
    const {
      username,
      password,
      firstname,
      lastname,
      email,
      telephone,
      address
    } = req.body;
    users.push({
      id: users.length + 1,
      username,
      password,
      firstname,
      lastname,
      email,
      telephone,
      address,
    });
    res.status(200).json({
      message: 'User Account Created'
    });
  }

  static authenticateUser(req, res) {
    if (req.body.username && req.body.password) {
      const {
        username,
        password
      } = req.body;
      const userCheck = user => user.username === username && user.password === password;
      const result = users.filter(userCheck);
      if (result.length < 1) {
        return res.status(400).send({ status: 'failed', message: 'Wrong username or password, enter correct credentials' });
      }
      return res.status(200).send({ status: 'successfull', message: `Welcome: ${username}` });
    }
    return res.status(400).send({
      message: 'Credentials must be entered'
    });
  }
}

export default UsersController;
