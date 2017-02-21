import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../../molecules/Layout'
import SkillsTable from '../../molecules/SkillsTable'
import EditSkillForm from '../../molecules/EditSkillForm'
// import { loadSkills, loadUserData } from '../../../actions'
import './index.sass'

export default class EditSkillsPage extends Component {
  render(){
    const { session, skills } = this.props

    const contexts = [
      {id: 0, name: 'JavaScript'},
      {id: 1, name: 'Testing'},
      {id: 2, name: 'Formatting'},
      {id: 3, name: 'SQL'},
      {id: 4, name: 'Terminal / Shell'},
      {id: 5, name: 'UNIX'},
      {id: 6, name: 'Node'},
      {id: 7, name: 'HTML'},
      {id: 8, name: 'CSS'},
      {id: 9, name: 'Browser'},
      {id: 10, name: 'DOM'},
    ]

    return <Layout className="EditSkillsPage" session={session}>
      <h1>Edit Skills</h1>
      <EditSkillForm contexts={contexts}/>
    </Layout>
  }
}
