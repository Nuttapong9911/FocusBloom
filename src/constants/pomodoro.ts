import type { PomodoroStep, PomodoroStepObj } from '../types/pomodoro'

const POMODORO_STEPS: Record<PomodoroStep, PomodoroStepObj> = {
  'working_1': { label: 'Planting', duration: 5, next: 'smallBreak' },
  'smallBreak': { label: 'Watering', duration: 5, next: 'working_2' },
  'working_2': { label: 'Fertilizing', duration: 5, next: 'longBreak' },
  'longBreak': { label: 'Harvesting', duration: 5, next: 'working_1' },
}

export {
  POMODORO_STEPS,
}