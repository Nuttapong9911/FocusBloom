<script lang="ts">
  import type { ProgressBarProps } from './types'

  let props: ProgressBarProps = $props()
 
  let width = $derived.by(() => {
    if (props.status === 'finished')
      return `${((props.currentStepIdx + 1) / props.steps.length) * 100}%`
    else
      return `${(props.currentStepIdx / props.steps.length) * 100}%`
  })
  
  let oneStepWidth = $derived(`${100 / props.steps.length}%`)
</script>

<section>
  <!-- Progress Bar -->
  <div class="w-full bg-gray-400 h-2.5 flex">
    <div class="h-full bg-[#3A5A40]" style:width={width}>
      &nbsp;
    </div>
    {#if props.status === 'running'}
      <div class="running bg-[#3A5A40]"  style:width={oneStepWidth}>
        &nbsp;
      </div>
    {/if}
  </div>

  <!-- Step Labels -->
  <div class="flex">
    {#each props.steps as step}
      <span class="text-center" style:width={oneStepWidth}>{step}</span>
    {/each}
  </div>
</section>

<style>
  .running{
    animation: blinking 1s linear infinite;
  }
  @keyframes blinking{
    0%{    opacity: 0.25;    }
    50%{    opacity: 1;    }
    100%{    opacity: 0.25;    }
  }
</style>