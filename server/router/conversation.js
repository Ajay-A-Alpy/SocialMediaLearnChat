const router = require("express").Router();
const controller = require("../controller/chat/chat");
const auth = require("../middleware/auth");
//create new conversation
router.post("/", auth, controller.createConversation);

//get my conversation
router.get("/student/:id", auth, controller.getConversation);

//get my chat status
router.post("/chat", auth, controller.getChatStatus);

//get expert conversation
router.get("/expert/:id", auth, controller.getExpertConversation);

module.exports = router;
