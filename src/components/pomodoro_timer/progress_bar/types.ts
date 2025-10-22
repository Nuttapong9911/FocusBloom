import type { TimerStatus } from '../../../types/pomodoro'

interface ProgressBarProps {
  status: TimerStatus
  steps: string[]
  currentStepIdx: number
}

export type { ProgressBarProps }