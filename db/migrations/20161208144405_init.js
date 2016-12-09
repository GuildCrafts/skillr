exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', (table) =>  {
      table.increments('id').primary()
      table.string('email').notNullable().unique()
      table.integer('github_id').notNullable().unique()
      table.string('name').notNullable()
      table.string('avatar_url')
      table.timestamps()
    }),

  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
  ])
}
