const bcrypt = require("bcryptjs");
//store pw in db 
// const hashedPassword = bcrypt.hashSync(process.env.USER, process.env.SALT)
const hashedPassword = "$2a$14$UbduEci6eG9o9UWqBeJ6wO9jB8L5zrdAoALUovYZCdyWASDzitc2a"
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('table_name').del()
    // .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'user1', password : hashedPassword, role_id: 1},
        { username: 'user2', password : hashedPassword, role_id: 2},
        { username: 'user3', password : hashedPassword, role_id: 2}
      ]);
    // })
};
