const db = require("../data/db-config");

function find() {
    return db("users")
}

function findBy(filter){
    return db("users")
    .select("*")
    .where(filter)
    .first();
}

function findById(id){
    return db("users")
    .select("*")
    .where({id})
    .first();
}
function findByUsername(username){
    return db("users as u")
    .innerJoin("roles as r", "r.role_id", "u.role_id")
    .where("u.username", username)
    .first("u.id", "u.username", "u.password", "r.role_name");
}
async function add(user){
    const [id] = await db("users")
    .insert(user)
    .returning("id")
    return findById(id);
}

module.exports = {
    find,
    findBy,
    findById,
    findByUsername,
    add
}