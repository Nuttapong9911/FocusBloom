import type { Fruit } from '../../types/pomodoro'

interface BasketProps {
  basket: Fruit[]
  disabled?: boolean
  className?: string
}

export type { BasketProps }