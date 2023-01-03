const express=require('express');
const userController=require('../controllers/users');
const auth=require('../middlewares/auth');

const router = express.Router();

router.post(
  "/signup",
  userController.signup
);

router.post(
  "/signin",
  userController.signin
);

router.get(
  "/info",
  auth,
  userController.getInfo
);

module.exports= router;