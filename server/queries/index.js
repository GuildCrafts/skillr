import knex from '../knex'

export default class Queries {

  constructor(currentUser){
    this.knex = knex
    this.currentUser = currentUser
  }

  allUsers(){
    return this.knex
      .select('*')
      .from('users')
  }

  getUserById(userId){
    return this.knex
      .select('*')
      .from('users')
      .where('id', userId)
      .first()
  }

  allSkills(){
    return this.knex
      .select('*')
      .from('skills')
  }

  getUserData(userId){
    return Promise.all([
      this.getRankingsForUser(userId),
      this.getHiddenSkillsForUser(userId),
    ]).then(([rankings, hiddenSkills]) => {
      return { rankings, hiddenSkills }
    })
  }

  getRankingsForUser(userId){
    return this.knex
      .select('*')
      .from('rankings')
      .where('user_id', userId)
  }

  getHiddenSkillsForUser(userId){
    return this.knex
      .select('*')
      .from('hidden_skills')
      .where('user_id', userId)
  }

}
