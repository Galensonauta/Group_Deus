const express = require('express');
// const validatorHandler = require('../../middlewares/validatorHandler');
// const { createUserSchema } = require('../../schemas/usersSchema');
const newUserRoute = require('./new');
const testUserRoute = require ("./test")

    const usersRouter = express.Router();    
    usersRouter.post('/new' ,newUserRoute);
    usersRouter.get("/test", testUserRoute)

module.exports= usersRouter