import type { PomodoroStep, TimerStatus } from '../../types/pomodoro'

interface PomodoroProps {
  timer: number
  setTimer: (seconds: number) => void
  timerStatus: TimerStatus
  setTimerStatus: (status: TimerStatus) => void
  currentStep: PomodoroStep
  goToNextStep: () => void
}

export type { PomodoroProps }