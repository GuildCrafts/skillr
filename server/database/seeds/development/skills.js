// const fs = require('fs')
// const JSON = require('JSON2')
// const seeds = JSON.parse(fs.readFileSync(__dirname+'/seeds.json', 'utf8'))
const skills = [
  {id: 13, parent_id: 0,   name: 'git'},
  {id: 14, parent_id: 13,  name: 'git clone'},
  {id: 15, parent_id: 14,  name: 'git shallow clone'},
  {id: 16, parent_id: 13,  name: 'git reset'},
  {id: 17, parent_id: 16,  name: 'git reset --hard'},
  {id: 18, parent_id: 16,  name: 'git reset --sort'},
  {id: 19, parent_id: 13,  name: 'git rebase'},
  {id: 20, parent_id: 19,  name: 'git rebase -i'},
  {id: 21, parent_id: 19,  name: 'git rebase --onto'},

  {id: 75, parent_id: 0,   name: 'for loops'},
  {id: 76, parent_id: 75,  name: 'reverse for loops'},
]

exports.seed = (knex) =>
  knex
    .table('skills')
    .del()
    .then(_ => {
      skills.forEach(skill =>
        skills.created_at = skills.updated_at = new Date
      )
      return knex
        .batchInsert('skills', skills, 100)
    })
