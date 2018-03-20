import business from '../model-dummy-data/businesses';


class Business {
  static createBusiness(req, res) {
    const {
      businessName,
      businessDescription,
      businessLocation,
      businessCategory,
      reviews
    } = req.body;
    business.push({
      id: business.length + 1,
      business_name: businessName,
      business_description: businessDescription,
      business_location: businessLocation,
      business_category: businessCategory,
      reviews
    });
    res.status(200).send({
      message: 'Business Created'
    });
  }

  static getBusiness(req) {
    if (req.params.id) {
      const findBusiness = businesses => businesses.id === parseInt(req.params.id, 10);
      const businessFound = business.filter(findBusiness);
      return businessFound;
    }
  }


  static modifyBusiness(req, res) {
    const businessFound = Business.getBusiness(req);
    const businessID = businessFound[0].id - 1;
    const {
      businessName,
      businessDescription,
      businessLocation,
      businessCategory,
      reviews
    } = req.body;

    if (businessFound.length < 1) {
      return res.status(400).send({
        Status: 'Failed',
        message: 'Record not found, please select an existing business'
      });
    }
    business[businessID].business_name = businessName;
    business[businessID].business_description = businessDescription;
    business[businessID].business_location = businessLocation;
    business[businessID].business_category = businessCategory;
    business[businessID].reviews = reviews;
    return res.status(200).send({
      Status: 'Successful',
      record: business[businessID]
    });
  }


  static deleteBusiness(req, res) {
    const businessFound = Business.getBusiness(req);
    const businessID = businessFound[0].id - 1;
    if (businessFound.length < 1) {
      return res.status(400).send({
        Status: 'Failed',
        message: 'Record not found, please select an existing business'
      });
    } else if (businessFound.length >= 1) {
      const removed = business.splice(businessID, 1);
      return res.status(200).json({
        Status: 'Business Deleted',
        record: removed
      });
    }
    return res.status(400).json({
      Status: 'Failed',
      message: 'A record must be entered'
    });
  }


  static getABusiness(req, res) {
    const businessFound = Business.getBusiness(req);
    const businessID = businessFound[0].id - 1;
    if (businessFound.length < 1) {
      return res.status(400).send({
        Status: 'Failed',
        message: 'Record not found, please select an existing business'
      });
    } else if (businessFound.length >= 1) {
      return res.status(200).json({
        Status: 'Successful',
        Business: business[businessID],
      });
    }
    return res.status(400).send({
      Status: 'Failed',
      message: 'Business not available, please select from our provided list'
    });
  }

  // static searchBusiness(req) {
  //   if (req.params) {
  //     const { location } = req.params;
  //     const validateLocation = locations => locations.toLowerCase() === location();
  //     const locationResult = (validateLocation !== '') ? validateLocation : 0;
  //     const selectedResult = (locationResult !== 0) ? 1 : 0;
  //     return selectedResult;
  //   }
  // }

  static getAllBusinesses(req, res) {
    const {
      location,
      category
    } = req.query;
    if (location) {
      const validateLocation = locations => locations.business_location.toLowerCase() === location.toLowerCase();
      const findBusiness = business.filter(validateLocation);
      return res.status(200).send({
        Business: findBusiness
      });
    }
    if (category) {
      const validateCategory = locations => locations.business_category.toLowerCase() === category.toLowerCase();
      const findBusiness = business.filter(validateCategory);
      return res.status(200).send({
        Business: findBusiness
      });
    }
    if (business.length < 1) {
      return res.status(200).json({
        Businesses: 'No business found in that location'
      });
    }
    return res.status(200).json({
      Businesses: business
    });
  }


  static getABusinessReviews(req, res) {
    const businessFound = Business.getBusiness(req);
    const businessID = businessFound[0].id - 1;
    if (businessFound.length < 1) {
      return res.status(400).send({
        Status: 'Failed',
        message: 'Record not found, please select an existing business'
      });
    } else if (businessFound.length >= 1) {
      return res.status(200).json({
        Business: business[businessID].business_name,
        Reviews: business[businessID].reviews
      });
    }
    return res.status(400).send({
      Status: 'Failed',
      message: 'Business not available, please select from our provided list'
    });
  }

  static addBusinessReview(req, res) {
    const businessFound = Business.getBusiness(req);
    if (businessFound && req.body.reviews) {
      const businessID = businessFound[0].id - 1;
      if (businessFound.length >= 1) {
        business[businessID].reviews.push(req.body.reviews);
        return res.status(200).send({
          message: 'Review added'
        });
      }
    } else {
      return res.status(400).send({
        message: 'Review not added'
      });
    }
  }
}

export default Business;
