
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('table_name').del()
  //   .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {role_id: 1, role_name: 'user'},
        {role_id: 2, role_name: 'owner'}
      ]);
    // });
};
