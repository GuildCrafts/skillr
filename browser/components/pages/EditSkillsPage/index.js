import React, { Component, PropTypes } from 'react'
import Button from '../../atoms/Button'
import Form from '../../atoms/Form'
import Layout from '../../molecules/Layout'
import SkillsTable from '../../molecules/SkillsTable'
// import { loadSkills, loadUserData } from '../../../actions'
import './index.sass'

export default class EditSkillsPage extends Component {
  render(){
    const { session, skills, rankings } = this.props

    return <Layout className="EditSkillsPage" session={session}>
      <h1>Edit Skills</h1>
      <NewSkillForm />
    </Layout>
  }
}


class NewSkillForm extends Component {

  onSubmit = event => {
    console.log('WUULD CRATE NEW SKILL')
  }

  render(){
    return <Form onSubmit={this.onSubmit}>
      <Form.Label>
        <input type="text" ref="name" placeholder="Skill Name" />
      </Form.Label>
      <Form.Label>
        <textarea ref="description" placeholder="Skill description…" />
      </Form.Label>
      <Form.Label>
        <select multiple placeholder="Contexts">
          <option>JavaScript</option>
          <option>Testing</option>
          <option>Formatting</option>
          <option>SQL</option>
          <option>Terminal / Shell</option>
          <option>UNIX</option>
          <option>Node</option>
          <option>HTML</option>
          <option>CSS</option>
          <option>Browser</option>
          <option>DOM</option>
        </select>
      </Form.Label>
    </Form>
  }
}
