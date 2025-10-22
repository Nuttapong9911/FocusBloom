export const moveFromBasket = $state<{value: boolean}>({value: false})

export const setMoveFromBasket = (value: boolean) => {
  moveFromBasket.value = value
}