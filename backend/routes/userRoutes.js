const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router
  .route('/login')
  .get(usersController.login)
  .post(usersController.login);

router
  .route('/me')
  .get(usersController.me)
  .post(usersController.me);


router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
