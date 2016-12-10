import React, { Component, PropTypes } from 'react'
import Layout from './Layout'
import Button from './Button'
import loadSkills from '../actions/loadSkills'

export default class SkillsPage extends Component {
  constructor(props){
    super(props)
    loadSkills()
  }
  render(){
    const { session } = this.props


    let skillsTree
    if (this.props.skills) {
      const skills = skillsArrayToTree(this.props.skills)
      console.log('skillsArrayToTree', skills)
      skillsTree = <SkillTree skills={skills} skillId={0} />
    }else{
      skillsTree = <div>Loading...</div>
    }
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

  static propTypes = {
    skillId: PropTypes.number.isRequired,
    depth: PropTypes.number,
  };

  static defaultProps = {
    depth: 0,
  };

  render(){
    const { skillId, skills, depth } = this.props
    const skillNodes = skills
      .filter(skill => skill.parent_id === skillId)
      .map(skill =>
        <Skill key={skill.id} skill={skill} depth={depth} />
      )
    return <div className="SkillsPage-SkillTree">
      {skillNodes}
    </div>
  }
}

class Skill extends Component {
  static propTypes = {
    skill: PropTypes.object.isRequired,
    depth: PropTypes.number.isRequired,
  };


  constructor(props){
    super(props)
    this.state = {expanded: false}
    this.toggle = this.toggle.bind(this)
  }
  toggle(){
    this.setState({expanded: !this.state.expanded})
  }
  render(){
    const { depth, skill } = this.props
    const { expanded } = this.state

    let toggleButton, skillsTree
    if (skill.skills){
      toggleButton = <Button type={false} onClick={this.toggle}>
        {expanded ? '-' : '+'} &nbsp;
      </Button>
      skillsTree = expanded ?
        <SkillTree skills={skill.skills} skillId={skill.id} depth={depth+1}/>
        : null
    }

    const style = {
      marginLeft: (depth*10)+'px'
    }
    return <div className="SkillsPage-SkillTree-Skill" style={style}>
      <div className="SkillsPage-SkillTree-Skill-row">
        {toggleButton}
        <span>{skill.name}</span>
      </div>
      {skillsTree}
    </div>
  }
}


const skillsArrayToTree = (allSkills, parent_id=0) => {
  const skills = allSkills.filter(skill => skill.parent_id === parent_id)
  if (skills.length === 0) return null
  skills.forEach(skill => {
    skill.skills = skillsArrayToTree(allSkills, skill.id)
  })
  return skills
}
