import React, { Component } from 'react'
import Layout from './Layout'
import Button from './Button'
import InspectObject from './InspectObject'

export default class LoggedInHomePage extends Component {
  render(){
    const { session } = this.props
    return <Layout className="HomePage" session={session}>
      <h1>Skillr</h1>
      <Button>Click me</Button>
      <InspectObject object={this.props} />
    </Layout>
  }
}
