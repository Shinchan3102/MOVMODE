const express=require('express');
const personController=require('../controllers/person');

const router = express.Router();

router.get("/:personId/medias", personController.personMedias);

router.get("/:personId", personController.personDetail);

module.exports=router;