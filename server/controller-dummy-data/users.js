import users from '../model-dummy-data/mUsers';

/**
 *
 * users class
 * holds all function to manipulate a user data
*/

class Users {
  static createUser(req, res) {
    users.push({
      id: users.length + 1,
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      telephone: req.body.telephone
    });
    res.status(200).send({ status: 'OK.....Record Inserted', users });
  }

  static getUsers() {
    return users.toString();
  }
}

export default Users;
