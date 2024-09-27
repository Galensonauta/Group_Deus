
const express = require('express');
const usersRouters = require('./usersRouters');
const moviesRouters = require('./moviesRouters');
const listasRouters = require('./listasRouters');

function routerApi(app){
    const router = express.Router();
    
    app.use( "/api/v1", router)
    router.use("/users",usersRouters)
    router.use("/listas",listasRouters)
    router.use("/movies", moviesRouters)
}

module.exports= routerApi