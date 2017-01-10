import React, { Component } from 'react'
import Layout from '../../molecules/Layout'

export default class LoggedInHomePage extends Component {
  render(){
    const { session } = this.props
    return <Layout className="HomePage" session={session}>
      <h1>Skillr</h1>
    </Layout>
  }
}
