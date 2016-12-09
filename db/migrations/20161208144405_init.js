exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', (table) =>  {
      table.increments('id').primary()
      table.string('email').unique()
      table.integer('github_id').unique()
      table.string('name')
      table.string('avatar_url')
      table.timestamps()
    }),

  })
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
  ])
}
