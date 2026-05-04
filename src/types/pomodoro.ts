type PomodoroStep = 'START' | 'FOCUS_1' | 'SMALL_BREAK' | 'EVENT' | 'FOCUS_2' | 'BIG_BREAK' | 'FINISHED'

type PomodoroStepConfig = {
  label: string
  duration: number
  next: PomodoroStep
}

type TimerStatus = 'paused' | 'running'

type Fruit = {
  id: string
  sprite: string
  level: number
}

export type {
  PomodoroStep,
  PomodoroStepConfig,
  TimerStatus,
  Fruit,
}
