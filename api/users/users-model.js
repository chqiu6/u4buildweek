const db = require("../data/db-config");

function find() {
    return db("users")
}

function findBy(filter){
    return db("users")
    .select("*")
    .where(filter);
}

function findById(id){
    return db("users")
    .select("*")
    .where({id})
    .first();
}

async function add(user){
    const [id] = await db("users")
    .insert(user)
    return findById(id);
}

module.exports = {
    find,
    findBy,
    findById,
    add
}