import { emit } from './webSocket'

export const loadAllSkills = () => {
  emit('loadAllSkills')
}
