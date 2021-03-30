
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('table_name').del()
  //   .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {items_id: 1, items_name: 'fish', items_description: 'fresh', price: 1.11, location: 'africa', category_id: 1},
        {items_id: 2, items_name: 'shirt', items_description: 'cozy', price: 2.22, location: 'africa', category_id: 2},
        {items_id: 3, items_name: 'battery', items_description: '', price: 3.33, location: 'africa', category_id: 3}
      ]);
    // });
};
