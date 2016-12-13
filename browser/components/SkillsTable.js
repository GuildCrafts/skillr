import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import './SkillsTable.sass'


export default class SkillsTable extends Component {

  constructor(props){
    super(props)
  }

  render(){
    const { skills, rankings } = this.props

    const skillIds = rankings.map(ranking => ranking.skill_id)
    const ourSkills = skills.filter(skill => skillIds.includes(skill.id))
    const today = moment().startOf('day')
    const firstDay = moment.min(rankings.map(ranking => moment(ranking.at))).startOf('day')

    let numberOfDays = today.diff(firstDay, 'days')

    let days = []
    while (numberOfDays > -1){
      days.push(firstDay.clone().add(numberOfDays--, 'days'))
    }

    const headers = [<th key="skill">Skill</th>].concat(
      days.map(day =>
        <th key={day.valueOf()}>{day.format('DD/MM')}</th>
      )
    )

    const rows = ourSkills.map(skill => {
      let latestRanking
      const rankingsForSkill = rankings.filter(ranking =>
        ranking.skill_id === skill.id
      )
      const rankingColumns = days.reverse().map(day => {
        const ranking = latestRanking = rankingsForSkill.find(r => moment(r.at).startOf('day').diff(day, 'days') === 0) || latestRanking
        return <td key={day.valueOf()}><SillRanking ranking={ranking} /></td>
      }).reverse()
      return <tr key={skill.id}>
        <td className="SkillsTable-skill-name"><div>{skill.name}</div></td>
        {rankingColumns}
      </tr>
    })

    return <table className="SkillsTable">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  }
}


const SillRanking = props => {
  const value = props.ranking ? props.ranking.value : 0
  return <select value={value}>
    <option value={0}>Never Seen It</option>
    <option value={1}>Seen It</option>
    <option value={2}>Can do it with help</option>
    <option value={3}>Can do it alone</option>
    <option value={4}>Can teach it</option>
    <option value={5}>Master</option>
  </select>
}
