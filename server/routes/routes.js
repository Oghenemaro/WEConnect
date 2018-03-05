import express from 'express';
import users from '../controller-dummy-data/users';

const router = express.Router();

router.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to WeConnect',
}));

router.post('/api/v1/auth/signup', users.createUser);

module.exports = router;

