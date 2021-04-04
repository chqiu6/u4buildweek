const express = require("express");
const usersModel = require("./users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {checkUsername, checkPasswordLength} = require("./users-middleware");
const router = express.Router()


//post register
//post login
//get logout

//test
router.get("/", async (req, res, next) => {
    try{
        const users = await usersModel.find()
        res.status(200).json(users);
        console.log(users);
    } catch(err){
        next(err);
    }
})
//register
//"error": "(intermediate value) is not iterable". fixed with .returning("id").
router.post("/register",checkUsername, checkPasswordLength, async (req, res, next) => {
    try {
        const {username, password} = req.body;
        // const userReg = await usersModel.findByUsername(username)
        // if(!password || password.length < 3){
        //     res.status(400).json({
        //         message : "Missing password or need more than 2 characters"
        //     })
        // } else {
            const newUser = await usersModel.add({
                username,
                password: await bcrypt.hash(password, 4)
            });
            // console.log("whats our pw length", newUser.password.length, newUser.password)
            res.status(201).json(newUser);
        // }
    } catch(err){
        next(err);
    }
})

//login
//working
router.post("/login", async (req, res, next) => {
    try{ 
        const {username, password} = req.body
        const user = await usersModel.findByUsername(username)
        if(!user){
            res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        //hashes pw again and check if matches with db's pw 
        const passwordCheck = await bcrypt.compare(password, user.password)
        if(!passwordCheck){
            res.status(401).json({
                message: "Invalid pw Credentials"
            })
        }else{
        const token = jwt.sign({
            userId: user.id,
            userRole: user.role_name,
            username: user.username
        }, process.env.SECRET);

        // //client set cookie to value
        console.log(user.role_id)
        console.log(user.role_name)
        res.cookie("token", token);
        res.json({
            message : `Welcome, ${user.username}!`,
            token : token
        });
    }
    } catch(err){ 
        next(err);
    }
})


module.exports = router;