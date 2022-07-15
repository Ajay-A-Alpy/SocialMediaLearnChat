const router = require("express").Router();
const controller = require("../controller/chat/chat");

//create new message
router.post("/", controller.createMessage);

//get messages
router.get("/:convId", controller.getMessage);

module.exports = router;
