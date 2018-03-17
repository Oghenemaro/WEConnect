import business from '../model-dummy-data/mBusiness';


class Business {
  static createBusiness(req, res) {
    if (!req.body.business_name) {
      return res.status(400).send({
        message: 'A record must be entered'
      });
    }
    const {
      businessName,
      businessDescription,
      businessLocation,
      businessCategory,
      review
    } = req.body;
    business.push({
      id: business.length + 1,
      business_name: businessName,
      business_description: businessDescription,
      business_location: businessLocation,
      business_category: businessCategory,
      reviews: review
    });
    res.status(200).send({
      message: 'Business Created'
    });
  }


  static modifyBusiness(req, res) {
    if (req.params.id) {
      for (let i = 0; i < business.length; i += 1) {
        if (business[i].id === parseInt(req.params.id, 10)) {
          business[i].business_name = req.body.business_name;
          business[i].business_description = req.body.business_description;
          business[i].business_location = req.body.business_location;
          business[i].business_category = req.body.business_category;
          business[i].reviews = req.body.reviews;
          return res.status(200).send({
            record: business[i],
            message: 'Record Updated'
          });
        }
      }
      return res.status(400).send({
        message: 'Record not found, please select an existing business'
      });
    }
  }


  static deleteBusiness(req, res) {
    if (!req.params.id) {
      res.status(400).json({
        message: 'Record not found'
      });
    } else if (req.params.id) {
      let i, removed;
      for (i = 0; i < business.length; i += 1) {
        if (business[i].id === parseInt(req.params.id, 10)) {
          removed = business.splice(i, 1);
          return res.status(200).json({
            record: removed,
            message: 'Business Deleted'
          });
        }
      }
    } else {
      return res.status(400).json({
        message: 'A record must be entered'
      });
    }
  }


  static getABusiness(req, res) {
    if (req.params.id) {
      const businessSelected = req.params.id;
      res.status(200).send({
        Business: business[businessSelected - 1]
      });
    } else {
      return res.status(400).send({
        message: 'Business not available, please select from our provided list'
      });
    }
  }

  static getAllBusinesses(req, res) {
    const {
      location,
      category
    } = req.query;
    const locationList = [];
    const categoryList = [];
    if (location) {
      for (let i = 0; i < business.length; i += 1) {
        if (business[i].business_location.toLowerCase() === location.toLowerCase()) {
          locationList.push(business[i]);
        }
      }
      return res.status(200).send({
        Business: locationList
      });
    }
    if (category) {
      for (let i = 0; i < business.length; i += 1) {
        if (business[i].business_category.toLowerCase() === category.toLowerCase()) {
          categoryList.push(business[i]);
        }
      }
      return res.status(200).send({
        Business: categoryList
      });
    }
    return res.status(200).json({
      Businesses: business
    });
  }


  static getABusinessReviews(req, res) {
    if (req.params.id) {
      let i;
      const businessSelected = req.params.id;
      for (i = 0; i < business.length; i += 1) {
        if (business[i].id === parseInt(businessSelected, 10)) {
          res.status(200).send({
            B: business[i].business_name,
            Reviews: business[i].reviews
          });
        }
      }
    } else {
      return res.status(400).send({
        message: 'Record not found, please select an existing business'
      });
    }
  }

  static addBusinessReview(req, res) {
    if (req.params.id && req.body.reviews) {
      const businessSelected = req.params.id;
      let i;
      for (i = 0; i < business.length; i += 1) {
        if (business[i].id === parseInt(businessSelected, 10)) {
          business[i].reviews.push(req.body.reviews);
          res.status(200).send({
            message: 'Review added'
          });
        }
      }
    } else {
      return res.status(400).send({
        message: 'Review not added'
      });
    }
  }
}

export default Business;
