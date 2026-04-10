<!--
  @component
  ### CustomTimer
 
  Render a timer in MM:SS format.

  #### Props
  - `seconds` (number): The total number of seconds to display as a timer.

-->
<script lang="ts">
  interface Props {
    seconds: number
    className?: string
  }

  let props: Props = $props()
</script>

<div class="flex items-center justify-center {props.className} gap-4">
  <div class="time">
    <div class="time__box">{Math.floor(props.seconds / 60).toString().padStart(2, '0')}</div>
    <div class="time__description">Minutes</div>
  </div>

  <div class="time">
    <div class="time__box">{(props.seconds % 60).toString().padStart(2, '0')}</div>
    <div class="time__description">Seconds</div>
  </div>
</div>

<style>
  .time {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .time__box {
    width: 128px;
    height: 128px;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #FEFCF3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;

    font-size: 60px;
    line-height: 60px;
    font-weight: bold;

    transition: all .2s;
  }

  .time__description {
    font-weight: 200;
  }
</style>