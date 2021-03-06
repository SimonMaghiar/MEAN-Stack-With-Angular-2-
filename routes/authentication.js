const express = require("express");
const router = express.Router();
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const config = require('../config/jwt_config');


//@POST
//@route: authentication/register
router.post('/register', async (req,res)=> {
    console.log(req.body);
    if(!req.body.email){
        res.json({success: false, message: "You must provide an e-mail"});
    }else if(!req.body.username) {
        res.json({success: false, message: "You must provide a username"});
    }
    else if(!req.body.password){
        res.json({success: false, message: "You must provide a password"});
    }
    else
    {
        let user = new User({
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: req.body.password
        });

        try 
        {
            await user.save();
            res.json({success: true, message: 'User Saved'});
        }catch(err)
        {
            if(err.code === 11000){
                res.json({success: false, message: 'Username or e-mail already exists'});
            }
            else {
                if(err.errors){
                    if(err.errors.email) {
                        res.json({success: false, message: err.errors.email.message });
                    } else {
                        if(err.errors.username) {
                            res.json({success: false, message: err.errors.username.message });
                        }else{
                            if(err.errors.password) {
                                res.json({success: false, message: err.errors.password.message });
                            }
                            else
                            {
                                res.json({success: false, message: err});
                            }
                        }
                    }
                }else {
                    res.json({success: false, message: "Coult not save user. Error: ", err });
                }
            }
        }
    }
});

/* When the user creates an account, first it has to be checked if the email is already present in the db or not*/
router.get('/checkEmail/:email', (req,res)=>{
    if(!req.params.email){
        res.json({success: false, message: "E-mail was not provided"});
    }else{
        User.findOne({email: req.params.email}, (err,user)=> {
            if(err){
                res.json({success: false, message: err})
            }else{
                if(user){
                    res.json({success: false, message: 'E-mail is already taken'});
                }else {
                    res.json({success: false, message: 'E-mail is availalble'});
                }
            }
        })
    }
})

/* When the user creates an account, first it has to be checked if the username is already present in the db or not*/
router.get('/checkUsername/:username', (req,res)=>{
    if(!req.params.email){
        res.json({success: false, message: "E-mail was not provided"});
    }else{
        User.findOne({username: req.params.username}, (err,user)=> {
            if(err){
                res.json({success: false, message: err})
            }else{
                if(user){
                    res.json({success: false, message: 'Username is already taken'});
                }else {
                    res.json({success: false, message: 'Username is availalble'});
                }
            }
        })
    }
})


router.post('/login', (req,res)=>{
   
    if(!req.body.username) 
        res.json({success: false, message: 'No username was provded'});
    if(!req.body.password) 
        res.json({success: false, message: 'No password was provded'});
    

    User.findOne({username: req.body.username.toLowerCase()}, (err,user)=>{
        if(err){
            res.json({success: false, message: err});
        } else {
            if(!user){
                res.json({success: false, message: "Username not found"});
            }
            else    // If username exists
            {
                const validPassword = user.comparePassword(req.body.password);
                if(!validPassword) {
                    res.json({success: false, message: "Password Invalid"});
                }
                else{
                    const token = jwt.sign({ userId: user._id }, config.secret , { expiresIn: '24h' });

                    res.json({success: true, message: "Success!", token: token , user: { username: user.username } }); 
                }
            }
        }
    })
});

//Middleware that wil run before the routes that are placed after this function. The routes that come before it, will not 
//call this middleware

router.use( (req,res,next) => {

    const token = req.headers['authorization'];
    if(!token) {
        res.json({successs:false, message: "No token provided"});
    }else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                res.json({success: false, message: "Token invalid: " + err});
            }
            else{
                req.decoded = decoded;
                next();
            }
        });
    }
});

router.get('/profile', (req,res)=> {
  
    User.findById({_id: req.decoded.userId}).select('username email').exec((err,user)=> {
        if(err) {
            res.json({success: false, message: err});
        }else {
            if(!user) {
                res.json({success: false, message: "User not found"});
            }
            else {
                res.json({success: true, user: user });
            }
        }
    })
})



module.exports = router;