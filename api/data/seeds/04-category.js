
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('table_name').del()
  //   .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {category_id: 1, category_name: 'foods'},
        {category_id: 2, category_name: 'clothings'},
        {category_id: 3, category_name: 'electronics'}
      ]);
    // });
};
