<script lang="ts">
  import type { BasketProps } from './types'
  import draggable from '$lib/draggable'
  import dropzone from '$lib/dropzone'
    import { moveFromBasket, setMoveFromBasket } from './basket.svelte';

  let props: BasketProps = $props()

  let basket = $state<string[]>([])

  const handleDrop = (fruit: string) => {
    basket = [...basket, fruit]

    if (moveFromBasket.value) {
      setMoveFromBasket(false)
    } else {
      props.goToNextStep()
    }
  }

  const removeFruit = (idx: number) => {
    if (idx <= basket.length -1) {
      let newBasket = [...basket]
      newBasket.splice(idx, 1)
      basket = newBasket
    }
  }
</script>

<div
  {@attach dropzone(handleDrop)}
  class="basket"
>
  {#if basket.length === 0}
    <p>Put your fruit here</p>
    
  {:else}
    <div class="flex gap-2 text-4xl">
      {#each basket as fruit, idx}
        <div
          {@attach draggable({ data: fruit, onPickup: () => setMoveFromBasket(true), onDrop: () => removeFruit(idx) })}
        >
          {fruit}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .basket {
    width: 33%;
    border: 2px dashed #ccc;
    padding: 1rem;
    border-radius: 0.5rem;
    color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
