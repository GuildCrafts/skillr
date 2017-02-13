import knex from './knex'
import logger from './logger'

const firstRecord = records => records[0]

export const createRecord = (table, attributes) =>
  knex
    .table(table)
    .insert(attributes)
    .returning('*')
    .then(firstRecord)


export const updateUser = (userId, attributes) =>
  knex
    .table('users')
    .where('id', userId)
    .insert(attributes)
    .returning('*')
    .then(firstRecord)


export const createUser = attributes => {
  logger.info(`createUser ${JSON.stringify(attributes)}`)
  attributes.created_at = attributes.updated_at = new Date
  return createRecord('users', attributes)
}


export const findOrCreateUserFromGithubProfile = githubProfile => {
  // console.log('??', githubProfile)
  const github_id = githubProfile.id
  const userAttributes = {
    github_id: github_id,
    name: githubProfile.displayName,
    email: githubProfile.emails[0].value,
    avatar_url: githubProfile.photos[0].value,
  }
  logger.info(`findOrCreateUserFromGithubProfile ${JSON.stringify(userAttributes)}`)
  return knex
    .table('users')
    .where('github_id', github_id)
    .first('id')
    .then(user =>{
      console.log('------ EXISTING USER?', user)
      return user
        ? updateUser(user.id, userAttributes)
        : createUser(userAttributes)
    })
}

