import db from '../models/index';
import business from '../model-dummy-data/businesses';
// import loginInfo from '../middleware/LoginStatus';

const dbBusinesses = db.businesses;

class Business {
  static createBusiness(req, res) {
    const {
      businessName,
      businessDescription,
      businessCategory,
      reviews,
      businessAddress,
      image
    } = req.body;
    return dbBusinesses.create({
      business_name: businessName,
      business_description: businessDescription,
      business_category: businessCategory,
      business_address: businessAddress,
      reviews,
      image,
      categoryID: req.body.categoryID,
      locationID: req.body.locationID,
      userID: req.body.userID
    }).then(() => res.status(200).send({ Status: 'Successfull', message: 'Business Created' }))
      .catch(error => res.status(401).send({ Status: 'Failed', message: error }));
  }

  static modifyBusiness(req, res) {
    const requestedBusiness = req.params.id;
    const user = req.body.userID;
    console.log(user);
    dbBusinesses.findOne({
      attributes: ['id', 'business_name', 'business_description', 'business_address', 'business_category', 'image', 'categoryID', 'locationID', 'userID'],
      where: {
        id: requestedBusiness
      }
    })
      .then((businessFound) => {
        const {
          businessNewName, businessNewDescription, businessCategory, businessAddress, image
        } = req.body;
        if (businessFound.userID !== user) {
          return res.status(401).send({ status: 'failed', message: 'You are not authorized to modify business' });
        }
        if (businessFound.userID === user) {
          businessFound.update(
            {
              business_name: businessNewName,
              business_description: businessNewDescription,
              // business_category: businessCategory,
              // business_address: businessAddress,
              image
            },
            { returning: true, where: { id: requestedBusiness } }
          )
            .then(businessUpdated => res.status(200).send({ status: 'Successful', message: businessUpdated, NewRecord: businessNewName }))
            .catch(error => res.status(400).send({ status: 'failed', message: error }));
        }
      })
      .catch(error => res.status(400).send({ status: 'failed', message: error }));
  }


  static deleteBusiness(req, res) {
    let businessFound = Business.getBusiness(req);
    if (!businessFound) {
      return res.status(400).send({
        Status: 'Failed',
        message: 'Record not found, please select an existing business'
      });
    }
    if (businessFound) {
      businessFound -= 1;
      const removed = business.splice(businessFound, 1);
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
    if (businessFound < 1) {
      return res.status(400).send({
        Status: 'Failed',
        message: 'Record not found, please select an existing business'
      });
    } else if (businessFound >= 1) {
      return res.status(200).json({
        Status: 'Successful',
        Business: business[businessFound],
      });
    }
    return res.status(400).send({
      Status: 'Failed',
      message: 'Business not available, please select from our provided list'
    });
  }

  static findBusinessByQuery(location, category) {
    if (location === undefined && category === undefined) {
      return business;
    } else if (location !== undefined) {
      const validateLocation = locations => locations.business_location.toLowerCase() === location.toLowerCase();
      const foundBusiness = business.filter(validateLocation);
      return foundBusiness;
    } else if (category !== undefined) {
      const validateCategory = locations => locations.business_category.toLowerCase() === category.toLowerCase();
      const findBusiness = business.filter(validateCategory);
      return findBusiness;
    }
  }

  static getAllBusinesses(req, res) {
    const { location, category } = req.query;
    if (location === undefined && category === undefined) {
      return res.status(200).send({ status: 'successful', Businesses: business });
    } else if (location !== undefined) {
      const businessByLocation = Business.findBusinessByQuery(location);
      return res.status(200).send({ status: 'successful', Business: businessByLocation });
    } else if (category !== undefined) {
      const businessByCategory = Business.findBusinessByQuery(category);
      return res.status(200).send({ status: 'successful', Business: businessByCategory });
    }
  }


  static getABusinessReviews(req, res) {
    let businessFound = Business.getBusiness(req);
    if (!businessFound) {
      return res.status(400).send({
        Status: 'Failed',
        message: 'Record not found, please select an existing business'
      });
    } else if (businessFound) {
      businessFound -= 1;
      return res.status(200).json({
        Business: business[businessFound].business_name,
        Reviews: business[businessFound].reviews
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
      if (businessFound >= 1) {
        business[businessFound].reviews.push(req.body.reviews);
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
