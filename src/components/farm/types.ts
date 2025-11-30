import type { PomodoroStep, TimerStatus } from '../../types/pomodoro'

interface FarmProps {
  timerStatus: TimerStatus
  currentStep: PomodoroStep
  goToNextStep: () => void
}

export type { FarmProps }