exports.up = async (knex) => {

  await knex.schema
  .createTable("roles", (role) => {
    role.increments("role_id")
    role.string("role_name")
  })

  await knex.schema
    .createTable('users', (users) => {
      users.increments('id')
      users.string('username', 200)
      .notNullable()
      users.string('password', 200)
      .notNullable()
      users.integer('role_id').defaultTo(1)
      .references('role_id')
      .inTable('roles')
      .onDelete("RESTRICT")
      .onUpdate("CASCADE")
      // users.string('user_email', 320).notNullable()
      // users.timestamps(false, true)
    })
  
  
  await knex.schema
    .createTable("category", (category) => {
      category.increments("category_id")
      category.string("category_name")
    })

  await knex.schema
    .createTable("items", (items) => {
      items.increments("items_id")
      items.string("items_name").notNullable().unique()
      items.string("items_description")
      items.decimal("items_price").notNullable()
      items.string("items_location")
      items.integer("category_id")
      .references("category_id")
      .inTable("category")
      .onDelete("CASCADE")
      .onUpdate("RESTRICT")
    })

    await knex.schema
    .createTable("sellers", (seller) => {
      seller.integer("user_id").notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")

      seller.integer("items_id").notNullable()
      .references("items_id")
      .inTable("items")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      seller.primary([`user_id`, `items_id`])
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('sellers')
  await knex.schema.dropTableIfExists('items')
  await knex.schema.dropTableIfExists('category')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('roles')
}
