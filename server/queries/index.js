import knex from '../knex'

function users(){
  return knex
    .select('*')
    .from('users')
}

function getUserById(userId){
  return knex
    .select('*')
    .from('users')
    .where('id', userId)
    .first()
}

function skills(){
  return knex
    .select('*')
    .from('skills')
}

function getUserData(userId){
  return Promise.all([
    getRankingsForUser(userId),
    getHiddenSkillsForUser(userId),
  ]).then(([rankings, hiddenSkills]) => (
    {rankings, hiddenSkills}
  ))
}

function getRankingsForUser(userId){
  return knex
    .select('*')
    .from('rankings')
    .where('user_id', userId)
}

function getHiddenSkillsForUser(userId){
  return knex
    .select('*')
    .from('hidden_skills')
    .where('user_id', userId)
}

export default {
  users,
  skills,
  getUserById,
  getUserData,
}
