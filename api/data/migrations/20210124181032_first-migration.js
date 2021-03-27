exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('user_username', 200).notNullable()
      users.string('user_password', 200).notNullable()
      // users.string('user_email', 320).notNullable()
      users.timestamps(false, true)
    })
  
  await knex.schema
    .createTable("role", (role) => {
      role.increments("role_id")
      role.string("role_name")
    })
  
  await knex.schema
    .createTable("category", (category) => {
      category.increments("category_id")
      category.string("category_name")
    })

  await knex.schema
    .createTable("items", (items) => {
      items.increments("items_id")
      items.string("items_name")
      items.string("items_description")
      items.decimal("items_price")
      items.string("items_location")
      table.integer("category_id")
      .references("category_id")
      .inTable("category")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
    })

    await knex.schema
    .createTable("seller", (seller) => {
      seller.integer("users_id")
      .references("users_id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpDate("CASCADE")

      seller.integer("items_id")
      .references("items_id")
      .inTable("items")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      table.primary(["users_id"], ["items_id"])
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('seller')
  await knex.schema.dropTableIfExists('items')
  await knex.schema.dropTableIfExists('category')
  await knex.schema.dropTableIfExists('role')
  await knex.schema.dropTableIfExists('users')
}
