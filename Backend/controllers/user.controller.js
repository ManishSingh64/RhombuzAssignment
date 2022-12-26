const express = require("express");
const USER = require("../schema/user.schema");
const userController = express.Router();

userController.get("/", async (req, res) => {
  let {sortByEmail, sortByGender,limit, page } = req.query;
  let data;
  if(sortByEmail =='asc' && page){
    data = await USER.find().sort({"email":1}).skip((page*limit)-limit).limit(limit)
}else if(sortByEmail == 'desc' && page){
    data = await USER.find().sort({"email":-1}).skip((page*limit)-limit).limit(limit)
}
    else if(sortByGender == 'asc' && page){
        console.log('in')
    data = await USER.find().sort({"gender":1}).skip((page*limit)-limit).limit(limit)
}
    else if(sortByGender == 'desc' && page){
    data = await USER.find().sort({"gender":-1}).skip((page*limit)-limit).limit(limit)
}else if(page){
    data = await USER.find().skip((page*limit)-limit).limit(limit)
}
  
  res.send(data);
});

module.exports = userController;
