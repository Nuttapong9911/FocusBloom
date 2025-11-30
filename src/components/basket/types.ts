import type { Fruit } from '../../types/pomodoro'

interface BasketProps {
  id: number
  basket: Fruit[]
  disabled?: boolean
  className?: string
}

export type { BasketProps }