<script lang="ts">
  import { onDestroy } from 'svelte'
  import { POMODORO_STEPS, POMODORO_STEP_CONFIG } from '../../constants/pomodoro'
  import CustomTimer from '../custom_timer.svelte'
  import ProgressBar from '../progress_bar/+progress_bar.svelte'
  import type { PomodoroProps } from './types'

  let {
    currentStep,
    timer,
    timerStatus,
    goToNextStep,
    setTimerStatus,
    setTimer,
  }: PomodoroProps = $props()

  // Interval obj id
  let interval = $state<number>(0)

  
  const currentStepIdx = $derived(POMODORO_STEPS.indexOf(currentStep))

  const buttonText = $derived.by(() => {
    if (timerStatus === 'running') return 'Stop'
    if (POMODORO_STEP_CONFIG[currentStep].duration === 0) return 'Next'
    return timer < POMODORO_STEP_CONFIG[currentStep].duration ? 'Continue' : 'Start'
  })

  const onClickTimerButton = () => {
    if (POMODORO_STEP_CONFIG[currentStep].duration === 0) {
      goToNextStep()
      return
    }

    if (timerStatus === 'paused') {
      setTimerStatus('running')

      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1)
        } else {
          clearInterval(interval)
          goToNextStep()
        }
      }, 100)
    } else if (timerStatus === 'running') {
      clearInterval(interval)
      setTimerStatus('paused')
    }
  }

  onDestroy(() => {
    if (interval) clearInterval(interval)
  })
</script>

<section class="h-full max-w-112 mx-auto flex flex-col items-center justify-center ">
  <h1 class="text-3xl mb-8 font-bold text-[#3A5A40]">Pomodoro</h1>

  <!-- TIMER -->
  <CustomTimer className="mb-4" seconds={timer} />
  
  <!-- BUTTON -->
  <button
    onclick={onClickTimerButton}
    class="w-full py-3 mb-4 bg-[#3A5A40] rounded-lg text-white text-lg cursor-pointer"
  >
    {buttonText}
  </button>

  <!-- CYCLE PROGRESS -->
  <div class="mb-2">Cycle Progress</div>
  <div class="w-full mb-4">
    <ProgressBar status={timerStatus} {timer} steps={Object.values(POMODORO_STEP_CONFIG).map(step => step.label)} currentStepIdx={currentStepIdx} blink={POMODORO_STEP_CONFIG[currentStep].duration === 0} />
  </div>

</section>