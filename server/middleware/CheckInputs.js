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
  static checkBusinessFormInput(req, res, next) {
    const {
      businessName,
      businessDescription,
      businessCategory,
      reviews
    } = req.body;
    const result = (businessName && businessDescription && businessCategory && reviews !== '') ? 1 : 0;
    if (result === 0) {
      return res.status(400).send({ Status: 'failed', message: 'All records must be provided, kindly provide all requested information' });
    }
    next();
  }

  static checkUpdateBusinessFormInput(req, res, next) {
    const businessSelected = req.params.id;
    const {
      businessNewName,
    } = req.body;
    const result = (businessNewName !== undefined && businessSelected !== undefined) ? 1 : 0;
    if (result === 1) { next(); } else if (result === 0) { return res.status(400).send({ status: 'failed', message: 'A record must be entered for update' }); }
  }
}

export default CheckInput;
