import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import Icon from './Icon'
import './SkillsTable.sass'


export default class SkillsTable extends Component {

  constructor(props){
    super(props)
  }

  render(){
    const { skills, rankings, session } = this.props

    const rankingsBytSkillId = {}
    rankings.forEach(ranking => {
      rankingsBytSkillId[ranking.skill_id] = rankingsBytSkillId[ranking.skill_id] || []
      rankingsBytSkillId[ranking.skill_id].push(ranking)
    })
    const ourSkills = skills.filter(skill => skill.id in rankingsBytSkillId)

    const thisWeek = moment().startOf('week')
    // const firstWeek = moment.min(rankings.map(ranking => moment(ranking.at))).startOf('week')
    const firstWeek = moment(session.user.created_at).startOf('week')

    let numberOfWeeks = thisWeek.diff(firstWeek, 'weeks')

    let weeks = []
    while (numberOfWeeks > -1){
      weeks.push(firstWeek.clone().add(numberOfWeeks--, 'weeks'))
    }

    const skillNameCells = ourSkills.map(skill =>
      <div key={skill.id} className="SkillsTable-cell">{skill.name}</div>
    )

    const rankingColumns = weeks.map(week => {
      const rankingCells = ourSkills.map(skill => {
        const rankings = rankingsBytSkillId[skill.id]
        return <div key={skill.id} className="SkillsTable-cell">
          <SillRanking />
        </div>
      })
      return <div key={week.valueOf()} className="SkillsTable-column">
        <div className="SkillsTable-cell">{week.format('DD/MM')}</div>
        {rankingCells}
      </div>
    })

    return <div className="SkillsTable">
      <div className="SkillsTable-skills SkillsTable-column">
        <div className="SkillsTable-cell">Skill</div>
        {skillNameCells}
      </div>
      <div className="SkillsTable-rankings">
        {rankingColumns}
      </div>
    </div>
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

const SillRanking = ({ranking}) => {
  const value = ranking ? ranking.value : 0
  const rankIcon = rankIcons[value]
  const rankName = rankNames[value]
  const options = rankNames.map((rankName, value) =>
    <option key={value} value={value}>{rankName}</option>
  )
  return <div className="SkillsTable-SillRanking">
    <Icon type={rankIcon} size={1} title={rankName} />
    <select value={value} onChange={()=>{}}>
      {options}
    </select>
  </div>
}
