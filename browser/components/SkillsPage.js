import React, { Component } from 'react'
import Layout from './Layout'

export default class SkillsPage extends Component {
  render(){
    const { session } = this.props
    return <Layout className="SkillsPage" session={session}>
      <h1>Skills</h1>
    </Layout>
  }
}
