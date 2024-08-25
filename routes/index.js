const express = require('express'); // Requerir libreria express

const productsRouters = require("./productsRouters");
const usersRouters=require("./usersRouters");
const categoriesRouters=require("./categoriesRouters")

function routerApi(app){
    const router = express.Router();
    app.use("/api/v1", router)
    router.use("/products",productsRouters)
    router.use("/users",usersRouters)
    router.use("/categories", categoriesRouters)
}

module.exports=routerApi