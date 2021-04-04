const express = require("express");
const itemsModel = require("./items-model");
const usersModel = require("../users/users-model");
const {restrict, checkRole} = require("../users/users-middleware");
const router = express.Router()
//get all items, get items by category, get items for an owner
//post new item
//update item
//delete item 

router.get("/", restrict, async (req, res, next) => {
    try { 
        const items = await itemsModel.findItems()
        res.status(200).json(items)
    } catch(err){
        next(err);
    }
})  

router.get("/category/:category_id", restrict, async (req, res, next) => {
    try{
        const categoryItems = await itemsModel.findItemsCategoryId(req.params.category_id)
        res.status(200).json(categoryItems)
    } catch(err){
        next(err);
    }
})

//checks if have token with restrict, 
//checks if its a owner or if the userId matches with dynamic route id
//checks if theres any items
router.get("/owner/:user_id", restrict, checkRole, async (req, res, next)=> {
    try{
        const {userId} = req.token
        const ownerItems = await itemsModel.findItemsByOwner(req.params.user_id)
        // if(req.token.userRole !== "owner" || req.token.userId != req.params.user_id){
            if(userId != req.params.user_id){
            res.status(400).json({
                message: "Role doesn't have permisison"
            })
            console.log("wat role name", req.token.userRole)
        } else if(ownerItems.length < 1){
            res.status(400).json({
                message: "No owner or has no items"
            })
        } else {
        console.log(req.body.role_name)
        console.log(ownerItems);
        res.status(200).json(ownerItems)
        }
    } catch(err){
        next(err);
    }
}) 

router.post("/", restrict, checkRole, async (req, res, next) => {
    try {
        const {items_name, items_description, items_price, items_location, category_id} = req.body
        const newItem = {
            items_name:  items_name,
            items_description: items_description, 
            items_price:  items_price, 
            items_location: items_location,
            category_id: category_id
        }
        const items = await itemsModel.add(newItem)
        console.log(req.body)
        res.status(201).json(items)
    } catch(err){
        next(err);
    }
})

router.put("/:items_id", restrict, checkRole, async (req, res, next) => {
    try{
        const updateItem = await itemsModel.update(req.params.items_id,req.body)
        console.log(updateItem)
        res.status(200).json(updateItem)
    } catch(err){
        next(err);
    }
})

router.delete("/:items_id", restrict, checkRole, async (req, res, next) => {
    try {
        await itemsModel.remove(req.params.items_id)
        res.status(204).end()
    } catch(err){
        next(err);
    }
})
module.exports = router;