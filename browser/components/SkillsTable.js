import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import Icon from './Icon'
import './SkillsTable.sass'


export default class SkillsTable extends Component {

  constructor(props){
    super(props)
  }

  render(){
    const { skills, rankings } = this.props

    const skillIds = rankings.map(ranking => ranking.skill_id)
    const ourSkills = skills.filter(skill => skillIds.includes(skill.id))
    const thisWeek = moment().startOf('week')
    const firstWeek = moment.min(rankings.map(ranking => moment(ranking.at))).startOf('week')

    let numberOfWeeks = thisWeek.diff(firstWeek, 'weeks')

    let weeks = []
    while (numberOfWeeks > -1){
      weeks.push(firstWeek.clone().add(numberOfWeeks--, 'weeks'))
    }

    const headers = [<th key="skill">Skill</th>].concat(
      weeks.map(week =>
        <th key={week.valueOf()}>{week.format('DD/MM')}</th>
      )
    )

    const rows = ourSkills.map(skill => {
      let latestRanking
      const rankingsForSkill = rankings.filter(ranking =>
        ranking.skill_id === skill.id
      )
      const rankingColumns = weeks.reverse().map(week => {
        const ranking = latestRanking = rankingsForSkill.find(r => moment(r.at).startOf('week').diff(week, 'weeks') === 0) || latestRanking
        return <td key={week.valueOf()}><SillRanking ranking={ranking} /></td>
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

const rankNames = [
  'Never Seen It',
  'Seen It',
  'Can do it with help',
  'Can do it alone',
  'Can teach it',
  'Master',
]

const rankIcons = [
  'eye-slash',
  'eye',
  'user-plus',
  'user',
  'user-md',
]

const SillRanking = props => {
  const value = props.ranking ? props.ranking.value : 0
  const rankIcon = rankIcons[value]
  const rankName = rankNames[value]
  const options = rankNames.map((rankName, value) =>
    <option key={value} value={value}>{rankName}</option>
  )
  return <div className="SkillsTable-SillRanking">
    <Icon type={rankIcon} size={2} title={rankName} />
    <select value={value} onChange={()=>{}}>
      {options}
    </select>
  </div>
}
