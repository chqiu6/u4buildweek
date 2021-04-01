
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('table_name').del()
  //   .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        { items_name: 'fish', items_description: 'fresh', items_price: 1.11, items_location: 'africa', category_id: 1},
        { items_name: 'shirt', items_description: 'cozy', items_price: 2.22, items_location: 'africa', category_id: 2},
        { items_name: 'battery', items_description: '', items_price: 3.33, items_location: 'africa', category_id: 3}
      ]);
    // });
};
