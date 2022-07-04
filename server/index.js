require("dotenv").config();

const express = require("express");
const connect = require("./database/connection");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT;

const studentRoute = require("./router/student");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS,PATCH,HEAD"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

//mongodb connection
connect();

//student route
app.use("/student", studentRoute); //http://localhost:5000/student

//server running
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
