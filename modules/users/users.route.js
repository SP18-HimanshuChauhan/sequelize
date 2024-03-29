const path = require('path');
const express = require('express')
const userRouter = express.Router()
const { getAllUsersByProvince, getAllUsersByUserClass } = require(path.resolve('./modules/users/users.controller'))
const rule = require(path.resolve('./modules/users/users.validator'));


userRouter.get("/api/users", [rule.getAllUsersByProvince, rule.verifyRules], getAllUsersByProvince)
userRouter.get("/api/users/userclass", [rule.getAllUsersByUserClass, rule.verifyRules], getAllUsersByUserClass)

module.exports = userRouter

