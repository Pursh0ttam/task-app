const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const mongodb = require("./config/db");
// const Router = require('./routes/AuthRoute');
const todoRoute = require("./routes/TodoRoutes");
const UserRouter = require("./routes/AuthRoute");
const { projectNameroute } = require("./routes/ProjectName");

//^env configuration
dotenv.config();

//^mongodb connection
mongodb();

let app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", UserRouter);
app.use("/api/v1/projectName", projectNameroute);
//lable Route
app.use("/api/v1/todo", todoRoute);

//^Route not found
app.use("*", (req, res, next) => {
  res.status(404).send({ error: true, message: "Route Not Found" });
});

//^ Error Handling Middleware

app.use((error, req, res, next) => {
  res.status(500).send({
    error: true,
    message: error.message
  });
});

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`.bgBlue.blue);
});


// {
//   "userName":"thomas",
//   "Email":"mpal6953@gmail.com",
//   "password":"Thomasyadav21@",
//   "address":"bihar",
//   "phone":4569871236,
//   "userType":"client"  
// }