import type { Fruit } from "../types/pomodoro"

export const sellBasketStates = $state<{ basket: Fruit[], disabled: boolean }>({ basket: [], disabled: true })

export const coins = $state<{value: number}>({ value: 0 })