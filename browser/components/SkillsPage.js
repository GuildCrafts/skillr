import React, { Component, PropTypes } from 'react'
import Layout from './Layout'
import Button from './Button'
import InspectObject from './InspectObject'
import loadSkills from '../actions/loadSkills'
import './SkillsPage.sass'

export default class SkillsPage extends Component {
  constructor(props){
    super(props)
    loadSkills()
  }
  render(){
    const { session, skills } = this.props

    const skillsTree = skills ?
      <SkillTree skills={skills} skillId={0} />
    :
      <div>Loading...</div>

    return <Layout className="SkillsPage" session={session}>
      <h1>Skills</h1>
      <Button
        href="/api/skills/export"
        externalLink
        target="_blank"
      >export</Button>
      {skillsTree}
    </Layout>
  }
}

class SkillTree extends Component {

  constructor(props){
    super(props)
    this.state = {
      expandedSkills: [0],
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle(skillId){
    let { expandedSkills } = this.state
    if (expandedSkills.includes(skillId)){
      expandedSkills = expandedSkills.filter(id => id !== skillId)
    }else{
      expandedSkills.push(skillId)
    }
    this.setState({expandedSkills})
  }

  render(){
    const { skillId, depth } = this.props
    const { expandedSkills } = this.state

    const skills = decorateSkills(this.props.skills)
    skills.forEach(skill => {
      skill.expanded = expandedSkills.includes(skill.id)
      skill.visible = expandedSkills.includes(skill.parent_id)
    })

    // return <InspectObject object={skills} />

    const skillNodes = skills
      .filter(skill => skill.visible)
      .map(skill =>
        <Skill
          key={skill.id}
          skill={skill}
          toggle={this.toggle}
        />
      )

    return <div className="SkillsPage-SkillTree">
      {skillNodes}
    </div>
  }
}

class Skill extends Component {

  static propTypes = {
    toggle: PropTypes.func.isRequired,
    skill: PropTypes.shape({
      name:  PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
      expanded: PropTypes.bool.isRequired,
    }),
  };

  render(){
    const { skill, toggle } = this.props

    const toggleButton = skill.children ?
      <Button
        className="SkillsPage-SkillTree-Skill-toggle"
        type={false}
        onClick={_ => toggle(skill.id) }
      >
        {skill.expanded ? '-' : '+'}
      </Button>
    :
      <span className="SkillsPage-SkillTree-Skill-toggle"></span>
    const style = {
      paddingLeft: (skill.depth*10)+'px'
    }

    return <div className="SkillsPage-SkillTree-Skill" style={style}>
      {toggleButton}
      <div className="SkillsPage-SkillTree-Skill-name">{skill.name}</div>
    </div>
  }
}

const decorateSkills = (skills) => {
  skills = skills.map(skill => Object.assign({}, skill))
  skills.forEach(skill => {
    skill.parent = skills.find(s => s.id === skill.parent_id)
    skill.children = skills.find(s => s.parent_id === skill.id)
  })
  skills.forEach(skill => {
    let depth = 0, parent = skill.parent
    while(parent){ depth++; parent = parent.parent}
    skill.depth = depth
  })
  return skills
}

