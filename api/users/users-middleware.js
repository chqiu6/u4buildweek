//check valid username
//check valid password

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersModel = require("./users-model");
const router = require("./users-router");

//checks for token for permission 
//checking token 
//error with restrict middleware when doing tests, cannot set headers after they're sent to client
async function restrict (req, res, next) {
        try {
            // const token = req.cookies.token;
            // const token = req.headers.authorization;
            if(!req.cookies.token){
                res.status(401).json({
                    message : "Invalid token"
                })
            }else{
            jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
                if(err){
                    res.status(401).json({
                        message: "Invalid token credentials"
                    })
                } else{
                req.token = decoded;
                console.log(decoded)
                next();
                }
            })}
        } catch(err){
            next(err);
        }
    }
// }
//checks if our role from our token is owner or user 
//owners have permission to add,update and delete items 
//users role don't have permission for the above and also don't have items
function checkRole(req, res, next){
    const {userRole} = req.token
    if(userRole !== "owner"){
        res.status(400).json({
            message: "Role doesn't have permission"
        })
    } else {
        next();
    }
}

//checks that username is free 
async function checkUsername(req, res, next){
    try{
        const {username, password} = req.body
        if(!username || username.length <= 3){
            res.status(400).json({
                message : "Missing username or need to be more than 3 characters"
            })
        }
        const user = await usersModel.findByUsername(username)
        if(user){
            res.status(409).json({
                message : "Username already taken"
            });
        }
        next();
    } catch(err){
        next(err);
    }
}

//password validate
async function checkPasswordLength (req, res, next){
    try{
    const {password} = req.body
    if(!password || req.body.password.length < 3){
        res.status(400).json({
            message : "Missing password or need more than 2 characters"
        })
    } else {
    next();
    }
} catch(err){
    next(err);
}
}

module.exports = {
    restrict,
    checkUsername,
    checkPasswordLength,
    checkRole
}