const db = require("../data/db-config");

//get all items
function findItems(){
    return db("items")
}

//get by id 
function findById(items_id){
    return db("items")
    .where("items_id", items_id)
    .first();
}
//get all items by category
function findItemsCategoryId(catid){
    return db("items as i")
    .innerJoin("category as c", "c.category_id", "i.category_id")
    .where("i.category_id", catid)
    .select("*");
}

//get items by owner
function findItemsByOwner(ownerid){
    return db("sellers as s")
    .innerJoin("items as i", "i.items_id", "s.items_id")
    .where("user_id", ownerid)
    .select("*");
}

//post item
async function add(item){
    const [id] = await db("items")
    .insert(item)
    .returning("items_id")
    return findById(id)
}

//put item
function update(items_id, items){
    return db("items")
    .where("items_id", items_id)
    .update(items)
    return findById(items_id)
}
//delete item
function remove(id){
    return db("items")
    .where("items_id", id)
    .del();
}

module.exports = {
    findItems,
    findById,
    findItemsCategoryId,
    findItemsByOwner,
    add,
    update,
    remove
}