<script lang="ts">
  import draggable from '$lib/draggable';
  import fertilizerImg from '$lib/images/fertilizer.svg'
  import harvestImg from '$lib/images/harvest.svg'
  import seedImg from '$lib/images/seed.svg'
  import waterImg from '$lib/images/watering.svg'
  import type { FarmProps } from './types'

  let props: FarmProps = $props()
  
  const randFruit = () => {
    const fruits = ['🍎', '🍊', '🍌', '🍇', '🍉', '🍓', '🍒', '🥝', '🍍', '🥭']
    return fruits[Math.floor(Math.random() * fruits.length)]
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
      {#if props.timerStatus === 'finished'}
        {@const rewardFruit = randFruit()}
        <div
          {@attach draggable({data: rewardFruit})}
          class='text-8xl'
        >
          {rewardFruit}
        </div>
      {:else}
      <img class={{"pomodoro-image": props.timerStatus === 'running'}} src={harvestImg} alt="harvest" width="100" />
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