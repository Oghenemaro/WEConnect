class CheckInput {
  static checkUserFormInput(req, res, next) {
    const {
      username,
      password,
      firstname,
      lastname,
      email,
      telephone,
      address
    } = req.body;
    const result = (username && password && firstname && lastname && email && telephone && address !== '') ? 1 : 0;
    if (result === 0) {
      return res.status(400).send({ Status: 'failed', message: 'All records must be provided, kindly provide all requested information' });
    }
    next();
  }
}

export default CheckInput;
