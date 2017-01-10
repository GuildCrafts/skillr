import React, { Component, PropTypes } from 'react'
import Button from '../../atoms/Button'
import Layout from '../../molecules/Layout'
import SkillsTable from '../../molecules/SkillsTable'
import loadSkills from '../../../actions/loadSkills'
import loadUserData from '../../../actions/loadUserData'
import './index.sass'

export default class EditSkillsPage extends Component {
  render(){
    const { session, skills, rankings } = this.props

    return <Layout className="EditSkillsPage" session={session}>
      <h1>Edit Skills</h1>
    </Layout>
  }
}
