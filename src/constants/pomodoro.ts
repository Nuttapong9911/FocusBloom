import type { Fruit, PomodoroStep, PomodoroStepObj } from '../types/pomodoro'

const POMODORO_STEPS: Record<PomodoroStep, PomodoroStepObj> = {
  'working_1': { label: 'Planting', duration: 5, next: 'smallBreak' },
  'smallBreak': { label: 'Watering', duration: 5, next: 'working_2' },
  'working_2': { label: 'Fertilizing', duration: 5, next: 'longBreak' },
  'longBreak': { label: 'Harvesting', duration: 5, next: 'working_1' },
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

export {
  TOTAL_FRUITS,
  POMODORO_STEPS,
  BASKET_CAPACITY,
  FRUITS,
  FRUIT_SPRITES,
  FRUIT_SELL_PRICE,
  FRUIT_UPGRADE_COUNT,
}