const bcrypt = require("bcryptjs");
//store pw in db 
const hashedPassword = bcrypt.hashSync(process.env.USER, process.env.SALT)
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('table_name').del()
    // .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, username: 'user1', password : hashedPassword, role_id: 1},
        {user_id: 2, username: 'user2', password : hashedPassword, role_id: 2},
        {user_id: 3, username: 'user3', password : hashedPassword, role_id: 2}
      ]);
    // })
};
