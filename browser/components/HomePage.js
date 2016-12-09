import React, { Component } from 'react'
import Layout from './Layout'
import InspectObject from './InspectObject'

export default class HomePage extends Component {
  render(){
    const { session } = this.props
    return <Layout className="HomePage" session={session}>
      <h1>Skillr</h1>
      <InspectObject object={this.props} />
    </Layout>
  }
}
