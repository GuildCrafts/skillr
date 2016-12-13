import moment from 'moment'

const weeksAgo = n => moment().subtract(n, 'week').toDate()

const skills = [
  {id: 0, name: 'git'},
  {id: 1, name: 'git clone'},
  {id: 2, name: 'git shallow clone'},
  {id: 3, name: 'git reset'},
  {id: 4, name: 'git reset --hard'},
  {id: 5, name: 'git reset --sort'},
  {id: 6, name: 'git rebase'},
  {id: 7, name: 'git rebase -i'},
  {id: 8, name: 'git rebase --onto'},
  {id: 9, name: 'for loops'},
  {id: 10, name: 'reverse for loops'},
]

const users = [
  {
    id: 1,
    email: 'jared@jaredgrippe.com',
    github_id: 8385,
    name: 'Jared Grippe',
    avatar_url: 'https://avatars.githubusercontent.com/u/8385?v=3',
  }
]

const rankings = [
  {
    user_id: 1,
    skill_id: 3,
    value: 0,
    at: weeksAgo(7),
  },
  {
    user_id: 1,
    skill_id: 3,
    value: 1,
    at: weeksAgo(6),
  },
  {
    user_id: 1,
    skill_id: 3,
    value: 1,
    at: weeksAgo(4),
  },
  {
    user_id: 1,
    skill_id: 4,
    value: 1,
    at: weeksAgo(4),
  },
  {
    user_id: 1,
    skill_id: 5,
    value: 1,
    at: weeksAgo(4),
  },
  {
    user_id: 1,
    skill_id: 3,
    value: 2,
    at: weeksAgo(3),
  },
]

const hidden_skills = [
]


exports.seed = (knex) => {

  const batchInsert = (table, records) => {
    if (table === 'skills' || table === 'users'){
      records.forEach(record =>
        record.created_at = record.updated_at = weeksAgo(7)
      )
    }
    return knex
      .table(table)
      .del()
      .then(_ =>
        knex.batchInsert(table, records, 100)
      )
  }

  return Promise.all([
    batchInsert('users', users),
    batchInsert('skills', skills),
    batchInsert('rankings', rankings),
    batchInsert('hidden_skills', hidden_skills),
  ])

}
