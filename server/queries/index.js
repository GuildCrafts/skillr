import knex from '../knex'

function users(){
  return knex
    .table('users')
    .select('*')
}

function getUserById({id}){
  return knex
    .table('users')
    .where('id', id)
    .select('*')
    .first()
}

function skills(){
  return knex
    .table('skills')
    .select('*')
}

export default {
  users,
  getUserById,
  skills,
}
