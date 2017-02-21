import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Button from '../../atoms/Button'
import Form from '../../atoms/Form'

export default class EditSkillForm extends Component {

  static propTypes = {
    contexts: PropTypes.array.isRequired,
    skill: PropTypes.object,
  }

  onSubmit = event => {
    const skill = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      contexts: this.refs.contexts.value(),
    }
    console.log('WUULD CRATE NEW SKILL', skill)
  }

  render(){
    const { skill, contexts } = this.props
    return <Form onSubmit={this.onSubmit}>
      <Form.Label>
        <h2>Name:</h2>
        <input
          type="text"
          ref="name"
          placeholder="Skill Name"
          defaultValue={skill.name}
        />
      </Form.Label>
      <Form.Label>
        <h2>Description:</h2>
        <textarea
          ref="description"
          placeholder="Skill description…"
          defaultValue={skill.description}
        />
      </Form.Label>
      <Form.Label>
        <h2>Contexts:</h2>
        <SelectContexts
          ref="contexts"
          contexts={contexts}
          defaultValue={skill.contexts}
        />
      </Form.Label>
      <Form.Label>
        <Button submit>Create Skill</Button>
      </Form.Label>
    </Form>
  }
}

class SelectContexts extends Component {

  value(){
    const select = ReactDOM.findDOMNode(this.refs.select);
    return [].map.call(select.selectedOptions, option => Number(option.value))
  }

  render(){
    const options = this.props.contexts.map(context =>
      <option key={context.id} value={context.id}>{context.name}</option>
    )
    return <select ref="select" multiple>{options}</select>
  }
}
