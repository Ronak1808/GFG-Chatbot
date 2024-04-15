const { Router } = require("express");
const router = Router();
const {
 getResponse
} = require('../controllers/chatControllers');


router.post("/query", getResponse);

module.exports = router;