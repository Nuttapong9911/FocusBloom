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

<span class={props.className}>
  {Math.floor(props.seconds / 60).toString().padStart(2, '0')}:{(props.seconds % 60).toString().padStart(2, '0')}
</span>