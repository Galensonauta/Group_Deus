const express = require('express');
const usersRouter=require("./users")
const router = express.Router();

    router.post("/new", usersRouter)        
    router.get("/my-interaction-list", usersRouter)
    router.post("/rank", usersRouter)

module.exports= router