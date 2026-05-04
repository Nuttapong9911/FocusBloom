import type { TimerStatus } from '../../types/pomodoro'

interface ProgressBarProps {
  status: TimerStatus
  timer: number
  steps: string[]
  currentStepIdx: number
  blink?: boolean
}

export type { ProgressBarProps }