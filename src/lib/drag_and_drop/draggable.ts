import { parser } from './drag_event_parser'

interface DraggableOptions<T extends { id: string }> {
  data: T
  onDragStart?: () => void
  onDragEnd?: () => void
}

const draggable = <T extends { id: string }>({ data, onDragEnd, onDragStart }: DraggableOptions<T>) => {
  const { setter } = parser<T>()

  return (node: HTMLElement) => {
    node.setAttribute('draggable', 'true')
    
    const handleDragStart = (e: DragEvent) => {
      setter(e, data)
      onDragStart?.()
      // node.classList.add('dragging')
    }

    const handleDragEnd = () => {
      onDragEnd?.()
      // node.classList.remove('dragging')
    }

    node.addEventListener('dragstart', handleDragStart)
    node.addEventListener('dragend', handleDragEnd)

    return () => {
      node.removeEventListener('dragstart', handleDragStart)
      node.removeEventListener('dragend', handleDragEnd)
    }
  }
}

export default draggable