<script lang="ts">
  const draggable = (data: string) => {
    return (node: HTMLElement) => {
      node.setAttribute('draggable', 'true')
      
      const handleDragStart = (e: DragEvent) => {
        e.dataTransfer?.setData('text/plain', data)
        // node.classList.add('dragging')
      }
  
      const handleDragEnd = () => {
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

  const dropzone = (onDrop: (data: any) => void) => {
    return (node: HTMLElement) => {
      const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        node.classList.add('over')
      }
  
      const handleDragLeave = (e: DragEvent) => {
        node.classList.remove('over')
      }
  
      const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        node.classList.remove('over')
        const data = e.dataTransfer?.getData('text/plain')
        if (data) {
          onDrop(data)
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

  let fruits = [ '🍎', '🍌', '🍇', '🍊', '🍉' ]
  let basket: string[] = []

  const handleDrop = (fruit: string) => {
    basket = [...basket, fruit.toString()]

    console.log(basket)
    console.log(fruits)
  }
</script>

<section>
  <h2>Fruits</h2>

  <div class="flex gap-4">
    {#each fruits as fruit}
      <div
        class="p-2 border rounded cursor-grabbing"
        {@attach draggable(fruit)}
      >
        {fruit}
      </div>
    {/each}
  </div>

  <h2>Basket</h2>

  <div
    class="dropzone"
    {@attach dropzone(handleDrop)}
  >
    {#if basket.length === 0}
      <p>Drop fruits here</p>
    {:else}
      {#each basket as fruit}
        <span>{fruit}</span>
      {/each}
    {/if}
  </div>
</section>

<style>
  .dropzone {
    border: 2px dashed #ccc;
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
  }
</style>