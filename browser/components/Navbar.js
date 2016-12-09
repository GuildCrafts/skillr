import React, { Component, PropTypes } from 'react'
import Button from './Button'
import './Navbar.sass'
import logout from '../actions/logout'

export default class Navbar extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  render(){
    const { user } = this.props.session
    if (user)
      return <div className="Navbar">
        Welcome back {user.name}
        <Button onClick={logout}>Logout</Button>
      </div>

    return <div className="Navbar">
      <Button href="/login">Login or Signup</Button>
    </div>
  }
}
