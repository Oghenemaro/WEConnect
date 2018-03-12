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


  static deleteBusiness(req, res) {
    if (req.params.id) {
      let i, removed;
      for (i = 0; i < business.length; i += 1) {
        if (business[i].id === parseInt(req.params.id, 10)) {
          removed = business.splice(i, 1);
          return res.status(200).json({ record: removed, message: 'Business Deleted' });
        }
      }
      res.status(400).json({ message: 'Record not found' });
    } else {
      return res.status(400).json({ message: 'A record must be entered' });
    }
  }


  static getABusiness(req, res) {
    if (req.params.id) {
      const businessSelected = req.params.id;
      res.status(200).send({ Business: business[businessSelected - 1] });
    } else {
      return res.status(400).send({ message: 'Business not available, please select from our provided list' });
    }
  }

  static getAllBusinesses(req, res) {
    const { location, category } = req.query;
    const locationList = [];
    const categoryList = [];
    if (location) {
      for (let i = 0; i < business.length; i += 1) {
        if (business[i].business_location.toLowerCase() === location.toLowerCase()) {
          locationList.push(business[i]);
        }
      }
      return res.status(200).send({ Business: locationList });
    }


    if (category) {
      let i;
      for (i = 0; i < business.length; i += 1) {
        if (business[i].business_category.toLowerCase() === category.toLowerCase()) {
          categoryList.push(business[i]);
        }
      }
      return res.status(200).send({ Business: categoryList });
    }
    return res.status(200).json({ Businesses: business });
  }


  static getABusinessReviews(req, res) {
    if (req.params.id) {
      let i;
      const businessSelected = req.params.id;
      for (i = 0; i < business.length; i += 1) {
        if (business[i].id === parseInt(businessSelected, 10)) {
          res.status(200).send({ B: business[i].business_name, Reviews: business[i].reviews });
        }
      }
    } else {
      return res.status(400).send({ message: 'Record not found, please select an existing business' });
    }
  }
}

export default Business;
