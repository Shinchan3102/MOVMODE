const favoriteController =require("../controllers/favorites");
const express=require('express');
const auth=require('../middlewares/auth');

const router = express.Router();

router.get(
    "/favorites",
    auth,
    favoriteController.getFavoritesOfUser
  );
  
  router.post(
    "/favorites",
    auth,
    favoriteController.addFavorite
  );
  
  router.delete(
    "/favorites/:favoriteId",
    auth,
    favoriteController.removeFavorite
  );

module.exports=router;