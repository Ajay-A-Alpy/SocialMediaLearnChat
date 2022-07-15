const router = require("express").Router();
const controller = require("../controller/chat/chat");

//create new conversation
router.post("/", controller.createConversation);

//get my conversation
router.get("/:id", controller.getConversation);

module.exports = router;
