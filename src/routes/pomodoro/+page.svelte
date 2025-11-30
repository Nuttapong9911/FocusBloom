<script lang="ts">
  import Farm from '../../components/farm/+farm.svelte'
  import Pomodoro from '../../components/pomodoro/+pomodoro.svelte'

  import Shop from '../../components/shop/+shop.svelte';
  import { POMODORO_STEPS } from '../../constants/pomodoro'
  import type { PomodoroStep, TimerStatus } from '../../types/pomodoro'

  // Number of seconds for Timer
  let timer = $state<number>(POMODORO_STEPS.working_1.duration)
  const setTimer = (newTime: number) => {
    timer = newTime
  }

  // Status of Timer
  let timerStatus = $state<TimerStatus>('paused')
  const setTimerStatus = (newStatus: TimerStatus) => {
    timerStatus = newStatus
  }

  // Step of Pomodoro in a cycle
  let currentStep = $state<PomodoroStep>('working_1')
  const setCurrentStep = (newStep: PomodoroStep) => {
    currentStep = newStep
  }

  const goToNextStep = () => {
    const nextStep = POMODORO_STEPS[currentStep].next
    setTimer(POMODORO_STEPS[nextStep].duration)
    setTimerStatus('paused')
    setCurrentStep(nextStep)
  }

</script>

<section class="h-full flex flex-col bg-[#FDF8E1]">
  <div class="h-[80%] flex">
    <div class="w-[50%] p-12">
      <Pomodoro
        {timer}
        {timerStatus}
        {currentStep}
        {setTimer}
        {setTimerStatus}
        {goToNextStep}
      />
    </div>
  
    <div class="w-[50%] p-12">
      <Farm
        {timerStatus}
        {currentStep}
        {goToNextStep}
      />
    </div>
  </div>

  <div class="h-[20%] bg-amber-100 p-5 ">
    <Shop />
  </div>
</section>

