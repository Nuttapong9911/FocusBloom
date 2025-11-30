let fruitId = 0

export const getFruitId = () => {
  return fruitId++
}

export const callBackRegistry = new Map<number, () => void>()