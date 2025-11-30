<script lang="ts">
  import { coins, sellBasketStates } from '../../global/state.svelte'
  import type { Fruit } from '../../types/pomodoro'
  import Basket from '../basket/+basket.svelte'

  let basket1 = $state<Fruit []>([])
  let basket2 = $state<Fruit []>([])
  let basket3 = $state<Fruit []>([])

</script>

<section class="h-full flex flex-col gap-3" >
  <div>Coins: {coins.value.toLocaleString()} 💰</div>
  <div class="h-full flex justify-center gap-5">
    <Basket basket={basket1} className={"border-[#ccc] text-[#ccc]"}  />
    <Basket basket={basket2} className={"border-[#ccc] text-[#ccc]"}  />
    <Basket basket={basket3} className={"border-[#ccc] text-[#ccc]"}  />
    <Basket
      basket={sellBasketStates.basket}
      disabled={sellBasketStates.disabled}
      className={"border-blue-400 text-blue-400"}
    />
    <!-- <SellBasket basket={{ value: sellBasket }} {enableSellBasket} {triggerSellFruit} bind:coins={coins} /> -->
  </div>
</section>