import type { PomodoroStep, TimerStatus } from "../../../types/pomodoro"

interface FarmProps {
  timerStatus: TimerStatus
  currentStep: PomodoroStep
}

export type { FarmProps }