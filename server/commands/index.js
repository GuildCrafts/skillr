import knex from '../knex'
import logger from '../logger'

export default class Commands {

  constructor(currentUser){
    this.knex = knex
    this.currentUser = currentUser
  }

  createRecord(table, attributes){
    return knex
      .table(table)
      .insert(attributes)
      .returning('*')
      .first()
  }

  createUser(attributes){
    logger.info(`createUser ${JSON.stringify(attributes)}`)
    attributes.created_at = attributes.updated_at = new Date
    return this.createRecord('users', attributes)
  }

  findOrCreateUserFromGithubProfile(githubProfile){
    console.log('??', githubProfile)
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
      .first('*')
      .then(user => user ? user : this.createUser(userAttributes))
  }

}



// export default {
//   findOrCreateUserFromGithubProfile,
// }
