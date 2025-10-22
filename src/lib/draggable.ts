interface DraggableOptions {
  data: string
  onPickup?: () => void
  onDrop?: () => void
}

const draggable = ({ data, onDrop, onPickup }: DraggableOptions) => {
    return (node: HTMLElement) => {
      node.setAttribute('draggable', 'true')
      
      const handleDragStart = (e: DragEvent) => {
        e.dataTransfer?.setData('text/plain', data)
        if (onPickup) {
          onPickup()
        }
        // node.classList.add('dragging')
      }
  
      const handleDragEnd = () => {
        // node.classList.remove('dragging')
        if (onDrop) {
          onDrop()
        }
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