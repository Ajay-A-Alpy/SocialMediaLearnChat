require("dotenv").config();

const express = require("express");
const connect = require("./database/connection");
const app = express();
const morgan = require("morgan");
const cors=require('cors');
const PORT = process.env.PORT;

const studentRoute = require("./router/student");
const expertRoute = require("./router/expert");
const ArticleRoute=require("../server/router/article")

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static('uploads'))

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");

//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,POST,PUT,DELETE,OPTIONS,PATCH,HEAD"
//   );

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept"
//   );
//   next();
// });

//mongodb connection
connect();

//student route
app.use("/student", studentRoute); //http://localhost:5000/student;
app.use('/article',ArticleRoute); //http://localhost:5000/article;

//expert route
app.use("/expert",expertRoute)

//server running
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

