
const express = require('express');
const usersRouters = require('./usersRouters');
const moviesRouters = require('./moviesRouters');
const listasRouters = require('./listasRouters');
const authRouters = require('./authRouters');
const apiTMDBRouters = require ("./apiTMDBRouters")
function routerApi(app){
    const router = express.Router();    
    app.use( "/api/", router)
    router.use("/tmdb", apiTMDBRouters)
    router.use("/users",usersRouters)
    router.use("/listas",listasRouters)
    router.use("/movies", moviesRouters)
    router.use("/auth", authRouters)
}

module.exports= routerApi