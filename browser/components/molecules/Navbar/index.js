import React, { Component, PropTypes } from 'react'
import Button from '../../atoms/Button'
import Avatar from '../../atoms/Avatar'
import logout from '../../../actions/logout'
import './index.sass'

export default class Navbar extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  render(){
    const { user } = this.props.session
    return <div className="Navbar">
      <div>
        <Button type={false} href="/">Skillr</Button>
        &nbsp;
        <Button href="/skills">Skills</Button>
        &nbsp;
        <Button href="/skills/edit">Edit Skills</Button>
      </div>
      <div>
        <span>Welcome back {user.name}</span>
        <Avatar user={user} />
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  }
}
