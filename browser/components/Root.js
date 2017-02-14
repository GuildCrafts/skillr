import React, { Component } from 'react'
import Router from '../Router'
import state from '../state'
import InspectObject from './utils/InspectObject'

export default class Root extends Component {

  constructor(props){
    super(props)
    this.state = state.get()
    this.update = this.update.bind(this)
    state.subscribe(this.update)
  }

  componentWillUnmount(){
    state.unsubscribe(this.update)
  }

  update(newState){
    this.setState(newState)
  }

  render(){
    console.info('Root#render', this.state)
    return <Router {...this.state} />
  }
}
