import type { PomodoroStep, TimerStatus } from '../../../types/pomodoro'

interface PomodoroProps {
  timer: number
  setTimer: (seconds: number) => void
  goToNextStep: () => void
  timerStatus: TimerStatus
  setTimerStatus: (status: TimerStatus) => void
  currentStep: PomodoroStep
  setCurrentStep: (step: PomodoroStep) => void
}

export type { PomodoroProps }