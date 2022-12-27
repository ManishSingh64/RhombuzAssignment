const express = require("express");
const USER = require("../schema/user.schema");
const userController = express.Router();
console.log('router')
userController.get("/", async (req, res) => {
  let { sortByEmail, sortByGender, limit, page } = req.query;
  let count = (await USER.find()).length;
  let data;
  if (sortByEmail == "asc" && sortByGender == "" && page) {
    data = await USER.find()
      .sort({ email: 1 })
      .skip(page * limit - limit)
      .limit(limit);
  } else if (sortByEmail == "desc" && sortByGender == "" && page) {
    data = await USER.find()
      .sort({ email: -1 })
      .skip(page * limit - limit)
      .limit(limit);
  } else if (sortByEmail == "" && sortByGender == "" && page) {
    data = await USER.find()
      .skip(page * limit - limit)
      .limit(limit);
  } else if (sortByGender == "asc" && sortByEmail == "" && page) {
    data = await USER.find()
      .sort({ gender: 1 })
      .skip(page * limit - limit)
      .limit(limit);
  } else if (sortByGender == "desc" && sortByEmail == "" && page) {
    data = await USER.find()
      .sort({ gender: -1 })
      .skip(page * limit - limit)
      .limit(limit);
  } else if (sortByGender == "" && sortByEmail == "" && page) {
    console.log('in')
    data = await USER.find()
      .skip(page * limit - limit)
      .limit(limit);
  }

  res.send({
    users: data,
    totalPages: Math.ceil(count / limit),
    currentPage: +page,
  });
});

userController.delete("/:id", async (req, res) => {
  //deleteOne

  await USER.deleteOne({ _id: req.params.id });
  res.send("Deleted successfully");
});

module.exports = userController;
