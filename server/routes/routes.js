import express from 'express';
import Users from '../controller/users';
import Business from '../controller/Business';
import CheckInput from '../middleware/CheckInputs';
import LocateToken from '../middleware/LocateToken';
import LoginStatus from '../middleware/LoginStatus';

const router = express.Router();

router.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to WeConnect',
}));

// router.get('/api/v1/auth/users', Users.getUsers);
router.post('/api/v1/auth/signup', CheckInput.checkUserFormInput, Users.createUser);
router.post('/api/v1/auth/signin', Users.authenticateUser);
router.get('/api/v1/businesses', Business.getAllBusinesses);
router.post('/api/v1/businesses/', CheckInput.checkBusinessFormInput, LocateToken.findToken, LoginStatus.checkLoginStatus, Business.createBusiness);
router.delete('/api/v1/businesses/:id', LocateToken.findToken, Business.deleteBusiness);
router.put('/api/v1/businesses/:id', CheckInput.checkUpdateBusinessFormInput, LocateToken.findToken, LoginStatus.checkLoginStatus, Business.modifyBusiness);
router.get('/api/v1/businesses/:id', Business.getABusiness);
router.post('/api/v1/businesses/:id/reviews', Business.addBusinessReview);
router.get('/api/v1/business/:id/reviews', Business.getABusinessReviews);
router.get('/api/v1/businesses?location', Business.getAllBusinesses);
router.get('/api/v1/businesses?category', Business.getAllBusinesses);

module.exports = router;
