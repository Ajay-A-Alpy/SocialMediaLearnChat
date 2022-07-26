require("dotenv").config();

const express = require("express");
const connect = require("./database/connection");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT;

const studentRoute = require("./router/student");
const expertRoute = require("./router/expert");
const ArticleRoute = require("../server/router/article");
const ConversationRoute = require("../server/router/conversation");
const messageRoute = require("../server/router/message");
const adminRoute = require("../server/router/admin");
const questionRoute = require("../server/router/question");

app.use(morgan("dev"));
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static("uploads"));

//mongodb connection
connect();

//student route
app.use("/student", studentRoute); //http://localhost:5000/student;
app.use("/article", ArticleRoute); //http://localhost:5000/article;
app.use("/question", questionRoute); //http://localhost:5000/question;
//expert route
app.use("/expert", expertRoute);
//admin route
app.use("/admin", adminRoute);
//conversation route
app.use("/conversation", ConversationRoute);
//message route
app.use("/message", messageRoute);

//server running
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
