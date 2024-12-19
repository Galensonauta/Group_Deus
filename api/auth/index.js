const express = require('express');
const loginRoute = require('./login');
const validateToken = require ("./validate-token")
const logoutRoute = require ("./logout")
    const authRouter = express.Router();    
    authRouter.post('/login', loginRoute);
    authRouter.get('/validate-token', validateToken);    
    authRouter.post('/logout', logoutRoute);    


module.exports= authRouter