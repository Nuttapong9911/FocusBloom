<script lang="ts">
  import { onDestroy } from 'svelte'
  import { FRUIT_SELL_PRICE, POMODORO_STEPS } from '../../constants/pomodoro'
  import CustomTimer from '../custom_timer.svelte'
  import ProgressBar from '../progress_bar/+progress_bar.svelte'
  import type { PomodoroProps } from './types'
  import type { PomodoroStep } from '../../types/pomodoro'
  import { coins, sellBasketStates } from '../../global/state.svelte'

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

  const pomodoroStepsArr = Object.keys(POMODORO_STEPS) as PomodoroStep[]
  const currentStepIdx = $derived(pomodoroStepsArr.indexOf(currentStep))

  // Render
  let buttonText = $state<'Start' | 'Stop' | 'Continue'>('Start')

  const onClickTimerButton = () => {
    if (timerStatus === 'finished') {
      buttonText = 'Start'
      sellBasketStates.disabled = true
      goToNextStep()
      
      if (sellBasketStates.basket.length > 0) {
        const earnedCoins = sellBasketStates.basket.reduce((total, fruit) => total + FRUIT_SELL_PRICE[fruit.level], 0)
        coins.value += earnedCoins

        localStorage.setItem('coins', coins.value.toString())

        sellBasketStates.basket = []
      }
    } else if (timerStatus === 'paused') {
      setTimerStatus('running')
      buttonText = 'Stop'
      

      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1)
        } else {  
          clearInterval(interval)

  
          if (currentStepIdx !== pomodoroStepsArr.length - 1) {
            goToNextStep()
            buttonText = 'Start'
          } else {
            buttonText = 'Continue'
            setTimerStatus('finished')
            sellBasketStates.disabled = false
          }
        }
      }, 100)
    } else if (timerStatus === 'running') {
      clearInterval(interval)
      setTimerStatus('paused')
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
  <CustomTimer className="mb-4" seconds={timer} />
  
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
    <ProgressBar status={timerStatus} steps={Object.values(POMODORO_STEPS).map(step => step.label)} currentStepIdx={currentStepIdx} />
  </div>

  <div class="w-full mb-4 px-4 py-6 text-md bg-white rounded-xl shadow-md">
    {#if currentStep === 'working_1' || currentStep === 'working_2'}
      <span>Stay focused! I will take care of the farm for you. :D</span>
    {:else}
      <span>Now we are on the break. Enjoy your time!</span>
    {/if}
  </div>
</section>