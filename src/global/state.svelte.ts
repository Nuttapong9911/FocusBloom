import type { Fruit } from "../types/pomodoro"

export const coins = $state<{value: number}>({ value: 0 })

export const sellBasketStates = $state<{ basket: Fruit[], disabled: boolean }>({ basket: [], disabled: true })
