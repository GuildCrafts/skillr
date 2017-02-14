import React, { Component, PropTypes } from 'react'
import './index.sass'

export default class Form extends Component {

  static propTypes = {
    onSubmit: PropTypes.func,
  }

  onSubmit = event => {
    event.preventDefault()
    if (this.props.onSubmit) this.props.onSubmit(event)
  }

  render(){
    const props = Object.assign({}, this.props)
    props.className = `Form ${this.props.className||''}`
    props.onSubmit = this.onSubmit
    return <form {...props}>{this.props.children}</form>
  }

}


Form.Label = props => {
  const labelProps = Object.assign({}, props)
  labelProps.className = `Form-Label ${props.className||''}`
  return <label {...labelProps}>{props.children}</label>
}
