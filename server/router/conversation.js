const router = require("express").Router();
const controller = require("../controller/chat/chat");

//create new conversation
router.post("/", controller.createConversation);

//get my conversation
router.get("/student/:id", controller.getConversation);

//get my chat status
router.post("/chat", controller.getChatStatus);

//get expert conversation
router.get("/expert/:id", controller.getExpertConversation);

module.exports = router;
