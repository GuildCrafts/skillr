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
      table.timestamps()
    }),

    knex.schema.createTable('rankings', table => {
      table.increments('id').primary()
      table.integer('skill_id').notNullable()
      table.integer('user_id').notNullable()
      table.dateTime('at').notNullable()
      table.unique(['user_id', 'skill_id', 'at'])
    }),

    knex.schema.createTable('hidden_skills', table => {
      table.integer('skill_id').notNullable()
      table.integer('user_id').notNullable()
      table.unique(['user_id', 'skill_id'])
    }),

  ])

exports.down = knex =>
  Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('skills'),
    knex.schema.dropTable('rankings'),
    knex.schema.dropTable('hidden_skills'),
  ])

