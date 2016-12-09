// const fs = require('fs')
// const JSON = require('JSON2')
// const seeds = JSON.parse(fs.readFileSync(__dirname+'/seeds.json', 'utf8'))
const skills = [
  {id: 14, name: 'git clone', parent_id: 0},
  {id: 15, name: 'git shallow clone', parent_id: 14},
]


exports.seed = (knex) =>
  knex.transaction(tr => {
    return knex
      .batchInsert('skills', skills, 100)
      .transacting(tr)
  })

