import React, { Component, PropTypes } from 'react'
import Button from '../../atoms/Button'
import Layout from '../../molecules/Layout'
import SkillsTable from '../../molecules/SkillsTable'
import loadSkills from '../../../actions/loadSkills'
import loadUserData from '../../../actions/loadUserData'
import './index.sass'

export default class SkillsPage extends Component {
  constructor(props){
    super(props)
    loadSkills()
    loadUserData()
  }
  render(){
    const { session, skills, rankings } = this.props

    const skillsTree = skills && rankings ?
      <SkillsTable
        session={session}
        skills={skills}
        rankings={rankings}
      />
    :
      <div>Loading...</div>

    return <Layout className="SkillsPage" session={session}>
      <div className="SkillsPage-header">
        <h1>Skills</h1>
        <Button
          href="/api/skills/export"
          externalLink
          target="_blank"
        >export</Button>
      </div>
      {skillsTree}
    </Layout>
  }
}
