<script lang="ts">
  import Basket from '../../components/pomodoro_timer/basket/+index.svelte';
  import Farm from '../../components/pomodoro_timer/farm/+index.svelte'
  import Pomodoro from '../../components/pomodoro_timer/pomodoro/+index.svelte'
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
        timer={timer}
        timerStatus={timerStatus}
        currentStep={currentStep}
        setTimer={setTimer}
        setTimerStatus={setTimerStatus}
        setCurrentStep={setCurrentStep}
        goToNextStep={goToNextStep}
      />
    </div>
  
    <div class="w-[50%] p-12">
      <Farm
        timerStatus={timerStatus}
        currentStep={currentStep}
      />
    </div>
  </div>

  <div class="h-[20%] bg-amber-100 flex justify-center p-5 gap-5">
    <Basket goToNextStep={goToNextStep}/>
    <Basket goToNextStep={goToNextStep}/>
    <Basket goToNextStep={goToNextStep}/>
  </div>
</section>

