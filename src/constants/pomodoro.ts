import type { Fruit, PomodoroStep, PomodoroStepConfig } from '../types/pomodoro'

const POMODORO_STEP_CONFIG: Record<PomodoroStep, PomodoroStepConfig> = {
  START:       { label: 'Start',       duration: 0, next: 'FOCUS_1' },
  FOCUS_1:     { label: 'Focus',       duration: 5, next: 'SMALL_BREAK' },
  SMALL_BREAK: { label: 'Short Break', duration: 5, next: 'EVENT' },
  EVENT:       { label: 'Event',       duration: 0, next: 'FOCUS_2' },
  FOCUS_2:     { label: 'Focus',       duration: 5, next: 'BIG_BREAK' },
  BIG_BREAK:   { label: 'Long Break',  duration: 5, next: 'FINISHED' },
  FINISHED:    { label: 'Finished',    duration: 0, next: 'START' },
}

const TOTAL_FRUITS = 4

const FRUIT_SPRITES = ['🍎', '🍊', '🍌', '🍇', '🍉', '🍓', '🍒', '🥝', '🍍', '🥭']

const FRUITS = FRUIT_SPRITES.reduce((acc: Record<number, Omit<Fruit, 'id'>>, sprite, index) => {
  acc[index + 1] = { sprite, level: 1 }
  acc[index + 1 + FRUIT_SPRITES.length] = { sprite, level: 2 }
  acc[index + 1 + FRUIT_SPRITES.length * 2] = { sprite, level: 3 }
  return acc
}, {})

const BASKET_CAPACITY = 4

const FRUIT_SELL_PRICE: Record<number, number> = {
  1: 1,
  2: 5,
  3: 10,
}

const FRUIT_UPGRADE_COUNT = 3

const POMODORO_STEPS = Object.keys(POMODORO_STEP_CONFIG) as PomodoroStep[]

export {
  TOTAL_FRUITS,
  POMODORO_STEP_CONFIG,
  BASKET_CAPACITY,
  FRUITS,
  FRUIT_SPRITES,
  FRUIT_SELL_PRICE,
  FRUIT_UPGRADE_COUNT,
  POMODORO_STEPS,
}
