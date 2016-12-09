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

export default {
  users,
  getUserById,
}
