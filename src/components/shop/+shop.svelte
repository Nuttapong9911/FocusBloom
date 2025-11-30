<script lang="ts">
    import { onMount } from 'svelte';
  import { coins, sellBasketStates } from '../../global/state.svelte'
  import type { Fruit } from '../../types/pomodoro'
  import Basket from '../basket/+basket.svelte'

  let basket1 = $state<Fruit []>([])
  let basket2 = $state<Fruit []>([])
  let basket3 = $state<Fruit []>([])

  onMount(() => {
    const savedCoins = localStorage.getItem('coins');
    if (savedCoins) {
      coins.value = parseInt(savedCoins);
    }

    const savedBasket1 = localStorage.getItem('basket_1')
    if (savedBasket1) basket1 = JSON.parse(savedBasket1)
    
    const savedBasket2 = localStorage.getItem('basket_2')
    if (savedBasket2) basket2 = JSON.parse(savedBasket2)
    
    const savedBasket3 = localStorage.getItem('basket_3')
    if (savedBasket3) basket3 = JSON.parse(savedBasket3)
  })

</script>

<section class="h-full flex flex-col gap-3" >
  <div>Coins: {coins.value.toLocaleString()} 💰</div>
  <div class="h-full flex justify-center gap-5">
    <Basket id={1} basket={basket1} className={"border-[#ccc] text-[#ccc]"}  />
    <Basket id={2} basket={basket2} className={"border-[#ccc] text-[#ccc]"}  />
    <Basket id={3} basket={basket3} className={"border-[#ccc] text-[#ccc]"}  />
    <Basket
      id={4}
      basket={sellBasketStates.basket}
      disabled={sellBasketStates.disabled}
      className={"border-blue-400 text-blue-400"}
    />
    <!-- <SellBasket basket={{ value: sellBasket }} {enableSellBasket} {triggerSellFruit} bind:coins={coins} /> -->
  </div>
</section>