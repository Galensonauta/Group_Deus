const express = require('express');


const passport=require("passport")
const router = express.Router();
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');

const UserService = require('./../services/usersService');
const service = new UserService();

router.post('/interactionUser', 
    passport.authenticate("jwt", {session:false}),
    async (req, res, next) => {
  try {
    const user=req.user
    const payload={
        sub:user.id,
        role: user.role        
    }
    const token=jwt.sign(payload, config.jwtSecret)
    res.json({
        user,
        token
    });
  } catch (error) {
    next(error);
  }
});

module.exports=router