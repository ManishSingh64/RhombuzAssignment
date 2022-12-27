const express = require("express");
const USER = require("../schema/user.schema");
const userController = express.Router();

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

module.exports = userController;
