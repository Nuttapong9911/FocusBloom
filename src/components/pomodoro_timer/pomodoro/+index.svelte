<script lang="ts">
  import { onDestroy } from 'svelte'
  import { POMODORO_STEPS } from '../../../constants/pomodoro'
  import CustomTimer from '../custom_timer.svelte'
  import ProgressBar from '../progress_bar/+index.svelte'
  import type { PomodoroProps } from './types'
  import type { PomodoroStep } from '../../../types/pomodoro'

  let props: PomodoroProps = $props()

  // Interval obj id
  let interval = $state<number>(0)

  const pomodoroStepsArr = Object.keys(POMODORO_STEPS) as PomodoroStep[]
  const currentStepIdx = $derived(pomodoroStepsArr.indexOf(props.currentStep))

  // Render
  let buttonText = $state<'Start' | 'Stop' | 'Continue'>('Start')

  const onClickTimerButton = () => {
    if (props.timerStatus === 'finished') {
      props.goToNextStep()
    } else if (props.timerStatus === 'paused') {
      props.setTimerStatus('running')
      buttonText = 'Stop'
      
      interval = setInterval(() => {
        if (props.timer > 0) {
          props.setTimer(props.timer - 1)
        } else {  
          clearInterval(interval)
  
          if (currentStepIdx !== pomodoroStepsArr.length - 1) {
            props.goToNextStep()
          } else {
            props.setTimerStatus('finished')
          }
          buttonText = 'Start'
        }
      }, 100)
    } else if (props.timerStatus === 'running') {
      clearInterval(interval)
      props.setTimerStatus('paused')
      buttonText = 'Continue'
    }
  }

  onDestroy(() => {
    if (interval) clearInterval(interval)
  })
</script>

<section class="h-full max-w-112 mx-auto flex flex-col items-center justify-center ">
  <h1 class="text-2xl mb-4">Pomodoro</h1>

  <!-- TIMER -->
  <CustomTimer className="mb-4" seconds={props.timer} />
  
  <!-- BUTTON -->
  <button
    onclick={onClickTimerButton}
    class="px-4 py-2 mb-4 bg-[#3A5A40] text-white  rounded"
  >
    {buttonText}
  </button>

  <!-- CYCLE PROGRESS -->
  <div class="mb-2">Cycle Progress</div>
  <div class="w-full mb-4">
    <ProgressBar status={props.timerStatus} steps={Object.values(POMODORO_STEPS).map(step => step.label)} currentStepIdx={currentStepIdx} />
  </div>

  <div class="w-full mb-4 px-4 py-6 text-md bg-white rounded-xl shadow-md">
    {#if props.currentStep === 'working_1' || props.currentStep === 'working_2'}
      <span>Stay focused! I will take care of the farm for you. :D</span>
    {:else}
      <span>Now we are on the break. Enjoy your time!</span>
    {/if}
  </div>
</section>