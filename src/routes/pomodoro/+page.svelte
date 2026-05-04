<script lang="ts">
  import Farm from '../../components/farm/+farm.svelte'
  import Pomodoro from '../../components/pomodoro/+pomodoro.svelte'

  import { POMODORO_STEP_CONFIG } from '../../constants/pomodoro'
  import type { PomodoroStep, TimerStatus } from '../../types/pomodoro'

  let timer = $state<number>(POMODORO_STEP_CONFIG.START.duration)
  const setTimer = (newTime: number) => {
    timer = newTime
  }

  let timerStatus = $state<TimerStatus>('paused')
  const setTimerStatus = (newStatus: TimerStatus) => {
    timerStatus = newStatus
  }

  let currentStep = $state<PomodoroStep>('START')
  const setCurrentStep = (newStep: PomodoroStep) => {
    currentStep = newStep
  }

  const goToNextStep = () => {
    const nextStep = POMODORO_STEP_CONFIG[currentStep].next
    setTimer(POMODORO_STEP_CONFIG[nextStep].duration)
    setTimerStatus('paused')
    setCurrentStep(nextStep)
  }

</script>

<section class="h-full flex flex-col bg-[#FDF8E1]">
  <div class="h-full flex">
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
        {timer}
        {currentStep}
        {goToNextStep}
      />
    </div>
  </div>

  <!-- <div class="h-[20%] bg-amber-100 p-5 ">
    <Shop />
  </div> -->
</section>

