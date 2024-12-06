
const express = require('express');
const usersRouters = require('./usersRouters');
const moviesRouters = require('./moviesRouters');
const listasRouters = require('./listasRouters');
const authRouters = require('./authRouters');

function routerApi(app){
    const router = express.Router();    
    app.use( "/api/api/v1", router)
    router.use("/users",usersRouters)
    router.use("/listas",listasRouters)
    router.use("/movies", moviesRouters)
    router.use("/auth", authRouters)

}

module.exports= routerApi