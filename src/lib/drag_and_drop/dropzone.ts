import { callBackRegistry } from '../../global'
import { parser } from './drag_event_parser'

interface DropzoneOptions<T extends { id: number }> {
  onDrop?: (data: T) => boolean
  onDragOver?: () => void
  onDragLeave?: () => void
  isDroppable?: boolean
}

const dropzone = <T extends { id: number }>({ onDrop, onDragOver, onDragLeave, isDroppable = true }: DropzoneOptions<T>) => {
  const { getter } = parser<T>()

  return (node: HTMLElement) => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      // node.classList.add('over')

      if (onDragOver) {
        onDragOver()
      }
    }

    const handleDragLeave = () => {
      // node.classList.remove('over')
      if (onDragLeave) {
        onDragLeave()
      }
    }

    const handleDrop = (e: DragEvent) => {
      if (isDroppable) {
        e.preventDefault()
        
        const data = getter(e)
        
        if (data && onDrop) {
          const isDropSuccess = onDrop(data as T)

          if (isDropSuccess) callBackRegistry.get(data.id)?.()
          else callBackRegistry.delete(data.id)
        }
        
        e.dataTransfer?.clearData()
        
        node.classList.remove('over')
      }
    }
    
    node.addEventListener('dragover', handleDragOver)
    node.addEventListener('dragleave', handleDragLeave)
    node.addEventListener('drop', handleDrop)

    return () => {
      node.removeEventListener('dragover', handleDragOver)
      node.removeEventListener('dragleave', handleDragLeave)
      node.removeEventListener('drop', handleDrop)
    }
  }
}

  export default dropzone