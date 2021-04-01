
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('table_name').del()
  //   .then(function () {
      // Inserts seed entries
      return knex('sellers').insert([
        {user_id: 1, items_id: 1},
        {user_id: 2, items_id: 2},
        {user_id: 3, items_id: 3}
      ]);
    // });
};
