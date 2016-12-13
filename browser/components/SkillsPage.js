import React, { Component, PropTypes } from 'react'
import Layout from './Layout'
import Button from './Button'
import SkillsTable from './SkillsTable'
import InspectObject from './InspectObject'
import './SkillsPage.sass'
import loadSkills from '../actions/loadSkills'
import loadUserData from '../actions/loadUserData'

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
      <h1>Skills</h1>
      <Button
        href="/api/skills/export"
        externalLink
        target="_blank"
      >export</Button>
      {skillsTree}
    </Layout>
  }
}
