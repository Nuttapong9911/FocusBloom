export const parser = <T extends { id: number }>() => {
  const setter = (e: DragEvent, data: T) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData('application/json', JSON.stringify(data))
    }
  }

  const getter = (e : DragEvent): T | null => {
    if (e.dataTransfer) {
      const data = e.dataTransfer.getData('application/json')
      return JSON.parse(data) as T
    }
    return null
  }

  return { setter, getter }
}