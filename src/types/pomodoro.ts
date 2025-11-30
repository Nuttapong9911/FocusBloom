type PomodoroStep = 'working_1' | 'smallBreak' | 'working_2' | 'longBreak'

type PomodoroStepObj = {
  label: string
  duration: number
  next: PomodoroStep
}

type TimerStatus = 'paused' | 'running' | 'finished'

type Fruit = {
  id: number
  sprite: string
  level: number
}

export type {
  PomodoroStep,
  PomodoroStepObj,
  TimerStatus,
  Fruit,
}