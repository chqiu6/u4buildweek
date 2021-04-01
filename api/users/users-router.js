const express = require("express");
const usersModel = require("./users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
//"error": "(intermediate value) is not iterable"
router.post("/register", async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const userReg = await usersModel.findByUsername(username)
        if(!userReg){
            const newUser = await usersModel.add({
                username,
                password: await bcrypt.hash(password, 4)
            });
            res.status(201).json(newUser);
        }
            res.status(409).json({
            message: "Username is already taken"
        });
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
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign({
            userId: user.id,
            userRole: user.role
        }, process.env.SECRET);

        // //client set cookie to value
        res.cookie("token", token);
        res.json({
            message : `Welcome, ${user.username}!`,
            token : token
        });
    } catch(err){ 
        next(err);
    }
})
// //logout
// //error : cannot read property of "destroy" from undefined
// router.get("/logout", async (req, res, next) => {
//     try{
//         //This will delete our session in db and expire the cookie in db
//         //client side would have the decision to whether they'll delete the cookie or not
//         //when session is deleted from server side, the cookie will be useless
//         req.session.destroy((err) => {
//             if(err){
//                 next(err)
//             } else{
//                 res.status(204).end();
//             }
//         })
//     }catch(err){
//         next(err);
//     }
// })

module.exports = router;