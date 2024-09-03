const express = require('express'); // Requerir libreria express

const usersRouters=require("./usersRouters");
const moviesRouters=require("./moviesRouters")
const favoritosRouters=require("./favoritosRouters")

function routerApi(app){
    const router = express.Router();
    app.use("/api/v1", router)
    router.use("/users",usersRouters)
    router.use("/favoritos",favoritosRouters)
    router.use("/movies", moviesRouters)
}

module.exports=routerApi