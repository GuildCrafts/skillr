import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Button from '../../atoms/Button'
import Form from '../../atoms/Form'
import Layout from '../../molecules/Layout'
import SkillsTable from '../../molecules/SkillsTable'
// import { loadSkills, loadUserData } from '../../../actions'
import './index.sass'

export default class EditSkillsPage extends Component {
  render(){
    const { session, skills } = this.props

    const contexts = [
      {id: 0, name: 'JavaScript'},
      {id: 1, name: 'Testing'},
      {id: 2, name: 'Formatting'},
      {id: 3, name: 'SQL'},
      {id: 4, name: 'Terminal / Shell'},
      {id: 5, name: 'UNIX'},
      {id: 6, name: 'Node'},
      {id: 7, name: 'HTML'},
      {id: 8, name: 'CSS'},
      {id: 9, name: 'Browser'},
      {id: 10, name: 'DOM'},
    ]

    return <Layout className="EditSkillsPage" session={session}>
      <h1>Edit Skills</h1>
      <NewSkillForm contexts={contexts}/>
    </Layout>
  }
}


class NewSkillForm extends Component {

  getSelectedContexts(){
    const select = ReactDOM.findDOMNode(this.refs.contexts);
    return [].map.call(select.selectedOptions, option => Number(option.value))
  }

  onSubmit = event => {
    const skill = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      contexts: this.getSelectedContexts(),
    }
    console.log('WUULD CRATE NEW SKILL', skill)
  }

  render(){
    const { contexts } = this.props
    return <Form onSubmit={this.onSubmit}>
      <Form.Label>
        <h2>Name:</h2>
        <input type="text" ref="name" placeholder="Skill Name" />
      </Form.Label>
      <Form.Label>
        <h2>Description:</h2>
        <textarea ref="description" placeholder="Skill description…" />
      </Form.Label>
      <Form.Label>
        <h2>Contexts:</h2>
        <SelectContexts ref="contexts" contexts={contexts}/>
      </Form.Label>
      <Form.Label>
        <Button submit>Create Skill</Button>
      </Form.Label>
    </Form>
  }
}

class SelectContexts extends Component {
  render(){
    const options = this.props.contexts.map(context =>
      <option key={context.id} value={context.id}>{context.name}</option>
    )
    return <select multiple>{options}</select>
  }
}
