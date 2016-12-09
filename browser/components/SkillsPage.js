import React, { Component } from 'react'
import Layout from './Layout'
import loadSkills from '../actions/loadSkills'

export default class SkillsPage extends Component {
  constructor(props){
    super(props)
    loadSkills()
  }
  render(){
    const { session } = this.props
    return <Layout className="SkillsPage" session={session}>
      <h1>Skills</h1>
    </Layout>
  }
}
