<script lang="ts">
  import draggable from '$lib/drag_and_drop/draggable'
  import fertilizerImg from '$lib/images/fertilizer.svg'
  import harvestImg from '$lib/images/harvest.svg'
  import seedImg from '$lib/images/seed.svg'
  import waterImg from '$lib/images/watering.svg'
  import { FRUIT_SPRITES, FRUITS, TOTAL_FRUITS } from '../../constants/pomodoro'
  import { callBackRegistry, getFruitId } from '../../global'
  import type { Fruit } from '../../types/pomodoro'

  import type { FarmProps } from './types'

  let props: FarmProps = $props()

  let rewardFruits = $state<Fruit[]>([])

  $effect(() => {
    if (props.currentStep === 'longBreak' && props.timerStatus === 'finished') {

      rewardFruits = Array.from({ length: TOTAL_FRUITS }, () => {
        const randomIdx = Math.floor(Math.random() * FRUIT_SPRITES.length)
        // const randomIdx = Math.floor(Math.random() * 30)
        const randFruit = FRUITS[randomIdx + 1]
        return { id: getFruitId(), sprite: randFruit.sprite, level: randFruit.level } as Fruit
      })
    }
  })

  const handlePickup = (fruit: Fruit) => {
    const removeDropFruit = () => {
      rewardFruits = rewardFruits.filter(rewardFruit => rewardFruit.id !== fruit.id)
      if (rewardFruits.length === 0) {
        // props.goToNextStep()
      }
    }

    callBackRegistry.set(fruit.id, removeDropFruit)
  }

  const handleDragEnd = (fruit: Fruit) => {
    callBackRegistry.delete(fruit.id)
  }

</script>

<section class="w-full h-full p-12 flex flex-col items-center bg-[#FEFCF3] shadow-lg rounded-xl">
<div class="text-xl">Your Forest Garden</div>
  <div class="my-auto">

    {#if props.currentStep === 'working_1'}
      <img class={{"pomodoro-image": props.timerStatus === 'running'}} src={seedImg} alt="seed" width="100" />

    {:else if props.currentStep === 'smallBreak'}
      <img class={{"pomodoro-image": props.timerStatus === 'running'}} src={waterImg} alt="water" width="100" />

    {:else if props.currentStep === 'working_2'}
      <img class={{"pomodoro-image": props.timerStatus === 'running'}} src={fertilizerImg} alt="fertilizer" width="100" />

    {:else if props.currentStep === 'longBreak'}
      {#if props.timerStatus !== 'finished'}
        <img class={{"pomodoro-image": props.timerStatus === 'running'}} src={harvestImg} alt="harvest" width="100" />
      
      {:else}
        <div class=" flex gap-4">
          {#if rewardFruits.length === 0}
            <p>All fruits have been harvested</p>
          {:else}
            {#each rewardFruits as rewardFruit}
              <div
                {@attach draggable<Fruit>({
                  data: rewardFruit,
                  onDragStart: () => handlePickup(rewardFruit),
                  onDragEnd: () => handleDragEnd(rewardFruit),
                })}
              >
                <span class="text-5xl">
                  {rewardFruit.sprite}
                </span>
              </div>
            {/each}
          {/if}
        </div>
      {/if}
    {/if}
  </div>
</section>

<style>
  .pomodoro-image {
    animation: shaking .5s infinite;
  }
  @keyframes shaking {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
  }
</style>