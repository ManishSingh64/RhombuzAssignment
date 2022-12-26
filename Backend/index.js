const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./controllers/user.controller");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/user", userController);

app.listen(process.env.PORT, async () => {
  mongoose.set('strictQuery',true);
  await mongoose.connect(process.env.MONGO_URL);
  console.log(`listening on port ${process.env.PORT}`);
});
