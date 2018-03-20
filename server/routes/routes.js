import express from 'express';
import users from '../controller-dummy-data/users';
// import business from '../controller-dummy-data/business';
import CheckInput from '../middleware/CheckInputs';

const router = express.Router();

router.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to WeConnect',
}));

router.get('/api/v1/auth/users', users.getUsers);
router.post('/api/v1/auth/signup', CheckInput.checkUserFormInput, users.createUser);
router.post('/api/v1/auth/signin', users.authenticateUser);
// router.get('/api/v1/businesses', business.getAllBusinesses);
// router.post('/api/v1/businesses/', business.createBusiness);
// router.delete('/api/v1/businesses/:id', business.deleteBusiness);
// router.put('/api/v1/businesses/:id', business.modifyBusiness);
// router.get('/api/v1/businesses/:id', business.getABusiness);
// router.post('/api/v1/businesses/:id/reviews', business.addBusinessReview);
// router.get('/api/v1/business/:id/reviews', business.getABusinessReviews);
// router.get('/api/v1/businesses?location', business.getAllBusinesses);


module.exports = router;
