import React, { Component } from 'react'
import Router from '../Router'

import state from '../state'
import loadSession from '../actions/loadSession'

export default class Root extends Component {

  constructor(props){
    super(props)
    this.state = state.get()
    this.update = this.update.bind(this)
    state.subscribe(this.update)
    loadSession()
  }

  componentWillUnmount(){
    state.unsubscribe(this.update)
  }

  update(newState){
    this.setState(newState)
  }

  render(){
    console.log('Root#render', this.state)
    if (this.state.session) return <Router />
    return <div>loading...</div>
  }
}
