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
    getUserById(userId),
    getRankingsAndSillsForUser(userId),
    getHiddenSkillsForUser(userId),
  ]).then(([user, {rankings, skills}, hiddenSkills]) => {
    user.rankings = rankings
    user.hiddenSkills = hiddenSkills
    return user
  })
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

function getSkillsForRankings(rankings){
  const skillIds = rankings.map(ranking => rankings.skill_id)
  return knex
    .select('*')
    .from('skills')
    .whereIn('id', skillIds)
}

function getRankingsAndSillsForUser(){
  return getRankingsForUser(userId)
    .then(rankings =>
      getSkillsForRankings(rankings)
        .then(skills => ({skills, rankings}))
    )
}

export default {
  users,
  getUserById,
  skills,
}
