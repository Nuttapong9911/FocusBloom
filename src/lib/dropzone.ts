  const dropzone = <T>(onDrop: (data: T) => void) => {
    return (node: HTMLElement) => {
      const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        node.classList.add('over')
      }
  
      const handleDragLeave = () => {
        node.classList.remove('over')
      }
  
      const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        node.classList.remove('over')
        const data = e.dataTransfer?.getData('text/plain')
        if (data) {
          onDrop(data as T)
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