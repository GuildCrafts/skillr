import React, { Component } from 'react'
import Layout from './Layout'
import Button from './Button'
import loadSkills from '../actions/loadSkills'

export default class SkillsPage extends Component {
  constructor(props){
    super(props)
    loadSkills()
  }
  render(){
    const { session } = this.props
    const skills = this.props.skills ?
      this.props.skills.map(skill =>
        <Skill key={skill.id} {...skill} />
      )
    :
      <div>Loading...</div>
    return <Layout className="SkillsPage" session={session}>
      <h1>Skills</h1>
      <Button
        href="/api/skills/export"
        externalLink
        target="_blank"
      >export</Button>
      {skills}
    </Layout>
  }
}

const Skill = props =>
  <div>{props.name}</div>
