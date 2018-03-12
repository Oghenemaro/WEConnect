import business from '../model-dummy-data/mBusiness';

class Business {
  static createBusiness(req, res) {
    if (req.body) {
      business.push({
        id: business.length + 1,
        business_name: req.body.business_name,
        business_description: req.body.business_description,
        business_location: req.body.business_location,
        business_category: req.body.business_category,
        reviews: req.body.reviews
      });
      res.status(200).send({ message: 'Business Created' });
    } else {
      return res.status(400).send({ message: 'A record must be entered' });
    }
  }

  static modifyBusiness(req, res) {
    if (req.params.id) {
      for (let i = 0; i <= business.length; i += 1) {
        if (business[i].id === parseInt(req.params.id, 10)) {
          business[i].business_name = req.body.business_name;
          business[i].business_description = req.body.business_description;
          business[i].business_location = req.body.business_location;
          business[i].business_category = req.body.business_category;
          business[i].reviews = req.body.reviews;
          res.status(200).send({ record: business[i], message: 'Record Updated' });
        }
      }
      res.status(400).send({ message: 'Record not found, please select an existing business' });
    } else {
      return res.status(400).send({ message: 'You are not signed in, Please sign in' });
    }
  }
}

export default Business;
