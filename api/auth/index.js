const express = require('express');
const loginRoute = require('./loginlogin');
const validateToken = require ("./validate-token")

    const authRouter = express.Router();    
    authRouter.post('/login', loginRoute);
    authRouter.get('/validate-token', validateToken);    

module.exports= authRouter