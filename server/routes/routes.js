import express from 'express';
import business from '../controller/business';
import UsersController from '../controller/UsersController';
import CheckInput from '../middleware/CheckInputs';
import locations from '../controller/locations';
import category from '../controller/category';

const router = express.Router();

router.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to WeConnect',
}));

router.get('/api/v1/auth/users', UsersController.getUsers);
router.post('/api/v1/auth/signup', CheckInput.checkUserFormInput, UsersController.createUser);
// router.post('/api/v1/auth/signin', users.authenticateUser);
router.get('/api/v1/businesses', business.getAllBusinesses);
router.post('/api/v1/businesses/', CheckInput.checkBusinessFormInput, business.createBusiness);
router.delete('/api/v1/businesses/:id', business.deleteBusiness);
router.put('/api/v1/businesses/:id', CheckInput.checkBusinessFormInput, business.modifyBusiness);
router.get('/api/v1/businesses/:id', business.getABusiness);
router.post('/api/v1/businesses/:id/reviews', business.addBusinessReview);
router.get('/api/v1/business/:id/reviews', business.getABusinessReviews);
router.get('/api/v1/businesses?location', business.getAllBusinesses);
router.get('/api/v1/businesses?category', business.getAllBusinesses);

// extras
router.get('/api/v1/locations', locations.getAllLocations);
router.post('/api/v1/locations/', locations.addNewLocation);
router.post('/api/v1/categories/', category.addNewCategory);
router.get('/api/v1/categories', category.getCategories);


module.exports = router;
