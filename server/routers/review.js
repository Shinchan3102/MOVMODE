const express=require('express');
const reviewController=require('../controllers/review');
const auth=require('../middlewares/auth');

const router = express.Router();

router.post(
  "/",
  auth,
  reviewController.create
);

router.delete(
  "/:reviewId",
  auth,
  reviewController.remove
);

module.exports=router;