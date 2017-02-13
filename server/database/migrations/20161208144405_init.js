exports.up = knex =>
  Promise.all([

    knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('email').notNullable().unique()
      table.integer('github_id').notNullable().unique()
      table.string('name').notNullable()
      table.string('avatar_url')
      table.timestamps()
    }),

    knex.schema.createTable('skills', table => {
      table.increments('id').primary()
      table.string('name').notNullable().unique()
      table.text('description')
      table.timestamps()
    }),

    knex.schema.createTable('contexts', table => {
      table.increments('id').primary()
      table.string('name').notNullable().unique()
    }),

    knex.schema.createTable('skill_contexts', table => {
      table.integer('skill_id').notNullable()
      table.integer('context_id').notNullable()
      table.unique(['skill_id', 'context_id'])
    }),

    knex.schema.createTable('rankings', table => {
      table.increments('id').primary()
      table.integer('skill_id').notNullable()
      table.integer('user_id').notNullable()
      table.integer('year').notNullable()
      table.integer('week').notNullable()
      table.integer('value').notNullable()
      table.unique(['user_id', 'skill_id', 'year', 'week'])
    })

  ])

exports.down = knex =>
  Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('skills'),
    knex.schema.dropTable('contexts'),
    knex.schema.dropTable('skill_contexts'),
    knex.schema.dropTable('rankings')
  ])

