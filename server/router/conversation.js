const router = require("express").Router();
const controller = require("../controller/chat/chat");

//create new conversation
router.post("/", controller.createConversation);

//get my conversation
router.get("/:id", controller.getConversation);

//get my chat status
router.post("/chat", controller.getChatStatus);

module.exports = router;
