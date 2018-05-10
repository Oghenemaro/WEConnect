import db from '../models/index';
// import business from '../model-dummy-data/businesses';
// import loginInfo from '../middleware/LoginStatus';

const dbBusinesses = db.businesses;
const dbLocations = db.locations;
const dbCategory = db.categories;
const dbReview = db.reviews;

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
    dbBusinesses.findOne({
      attributes: ['id', 'business_name', 'business_description', 'business_address', 'business_category', 'image', 'categoryID', 'locationID', 'userID'],
      where: {
        id: requestedBusiness
      }
    })
      .then((businessFound) => {
        const {
          businessNewName, businessNewDescription, image
        } = req.body;
        if (businessFound.userID !== user) {
          return res.status(401).send({ status: 'failed', message: 'You are not authorized to modify business' });
        }
        if (businessFound.userID === user) {
          businessFound.update(
            {
              business_name: businessNewName,
              business_description: businessNewDescription,
              image
            },
            { returning: true, where: { id: requestedBusiness } }
          )
            .then(businessUpdated => res.status(200).send({ status: 'Successful', message: businessUpdated }))
            .catch(error => res.status(400).send({ status: 'failed', message: error }));
        }
      })
      .catch(() => res.status(400).send({ status: 'failed', message: 'Business not found' }));
  }


  static deleteBusiness(req, res) {
    const businessSelected = req.params.id;
    const user = req.body.userID;
    dbBusinesses.findOne({
      attributes: ['id', 'business_name', 'business_description', 'business_address', 'business_category', 'image', 'categoryID', 'locationID', 'userID'],
      where: {
        id: businessSelected
      }
    }).then((businessFound) => {
      if (businessFound.userID !== user) {
        return res.status(401).send({ status: 'failed', message: 'You are not authorized to delete this business ' });
      }
      if (user === undefined) {
        return res.status(400).send({ status: 'failed', message: 'Invalid user, please login' });
      }
      if (businessFound.userID === user) {
        businessFound.destroy({ force: true })
          .then(() => res.status(200).send({ status: 'Successful', message: 'Business Deleted' }))
          .catch(error => res.status(400).send({ status: 'failed', message: error }));
      }
    })
      .catch(error => res.status(400).send({ status: 'failed', message: error }));
  }


  static getABusiness(req, res) {
    const businessSelected = req.params.id;
    dbBusinesses.findOne({
      attributes: ['id', 'business_name', 'business_description', 'business_address', 'business_category', 'image', 'categoryID', 'locationID', 'userID'],
      where: {
        id: businessSelected
      }
    }).then(businessFound => res.status(200).send({ Status: 'Successful', message: businessFound }))
      .catch(error => res.status(400).send({ Status: 'failed', message: error }));
  }

  static findBusinessByQuery(location, category) {
    if (location === undefined && category === undefined) {
      return dbBusinesses.findOne({
        attributes: ['id', 'business_name', 'business_description', 'business_address', 'business_category', 'image', 'categoryID', 'locationID', 'userID'],
        where: {
          id: 3
        }
      }).then(found => found).catch(error => error);
    } else if (location !== undefined) {
      return dbLocations.findOne({
        attributes: ['id', 'state'],
        where: {
          state: location.toLowerCase()
        }
      }).then(businessesByLocation => dbBusinesses.findAll({
        attributes: ['id', 'business_name', 'business_description', 'business_address', 'business_category', 'image', 'categoryID', 'locationID', 'userID'],
        where: {
          locationID: businessesByLocation.id
        }
      }))
        .catch(error => error);
    } else if (category !== undefined) {
      return dbCategory.findOne({
        attributes: ['id', 'category'],
        where: {
          category: category.toLowerCase()
        }
      }).then(categoryFound => dbBusinesses.findAll({
        attributes: ['id', 'business_name', 'business_description', 'business_address', 'business_category', 'image', 'categoryID', 'locationID', 'userID'],
        where: {
          locationID: categoryFound.id
        }
      })).then(businessesByCategory => businessesByCategory)
        .catch(error => error);
    }
  }

  static getAllBusinesses(req, res) {
    const { location, category } = req.query;
    if (location === undefined && category === undefined) {
      // return dbBusinesses.findAll({
      //   attributes: ['id', 'business_name', 'business_description', 'business_address', 'business_category', 'image', 'categoryID', 'locationID', 'userID']
      // }).then(found => res.status(200).send({ satus: 'Unmodified', message: found })).catch(error => res.status(400).send({ satus: 'Unmodified', message: error }));
      const businessList = Business.findBusinessByQuery(location, category);
      return res.status(200).send({ satus: 'Successful', message: businessList });
    } else if (location !== undefined) {
      const businessesByLocation = Business.findBusinessByQuery(location);
      if (businessesByLocation !== undefined) {
        return res.status(200).send({ status: 'Successful', Business: businessesByLocation });
      }
      return res.status(400).send({ status: 'failed', Business: 'Invalid Location, provide an existing location' });
    } else if (category !== undefined) {
      const businessesByCategory = Business.findBusinessByQuery(category);
      if (businessesByCategory !== undefined) {
        return res.status(200).send({ status: 'Successful', Business: businessesByCategory });
      }
      return res.status(400).send({ status: 'failed', Business: 'Invalid Category, provide an existing category' });
    }
  }

  static getBusiness(req) {
    const businessSelected = req.params.id;
    dbBusinesses.findOne({
      attributes: ['id', 'business_name', 'business_description', 'business_address', 'business_category', 'image', 'categoryID', 'locationID', 'userID'],
      where: {
        id: businessSelected
      }
    }).then(businessFound => businessFound)
      .catch(error => error);
  }

  static addBusinessReview(req, res) {
    const businessSelected = req.params.id;
    const review = req.body.reviews;
    const reviewLength = review.length;
    dbBusinesses.findOne({
      attributes: ['id', 'business_name', 'business_description', 'business_address', 'business_category', 'image', 'categoryID', 'locationID', 'userID'],
      where: {
        id: businessSelected
      }
    }).then((businessFound) => {
      if (businessFound === undefined) {
        return res.status(400).send({ status: 'failed', message: 'Provide an existing business' });
      }
      if (reviewLength <= 0) {
        return res.status(400).send({ status: 'failed', message: 'A review must be added' });
      }
      if (businessFound !== undefined && reviewLength > 0) {
        return dbReview.create({
          review,
          userID: req.body.userID,
          businessID: businessFound.id
        }).then(() => res.status(200).send({ status: 'Successful', message: 'Review Added' }))
          .catch(error => res.status(400).send({ status: 'failed', message: error }));
      }
    }).catch(() => res.status(400).send({ status: 'failed', message: 'Business not found, provide an existing business' }));
  }

  static getABusinessReviews(req, res) {
    const businessReviewID = req.params.id;
    if (businessReviewID !== undefined) {
      return dbReview.findAll({
        attributes: ['review', 'userID', 'businessID'],
        where: {
          businessID: businessReviewID
        }
      }).then(businessReviews => res.status(200).send({ status: 'Successful', message: businessReviews }))
        .catch(() => res.status(400).send({ status: 'failed', message: 'No review found for this business' }));
    } else if (businessReviewID === undefined) {
      return res.status(400).send({ status: 'failed', message: 'Provide an existing business' });
    }
  }
}

export default Business;
