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
}

export default Business;
