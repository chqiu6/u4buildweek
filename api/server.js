const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const usersRouter = require("./users/users-router")
const itemsRouter = require("./items/items-router")
const cookieParser = require("cookie-parser")

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(cookieParser());
server.use("/api/users", usersRouter);
server.use("/api/items", itemsRouter);



server.get("/", (req, res) => {
    res.json({
        message : "Checking if it's working as intended"
    })
})

server.use((err, req, res, next) =>{
    res.status(500).json({
        message : "Something went wrong",
        error: err.message
    })
})

module.exports = server
