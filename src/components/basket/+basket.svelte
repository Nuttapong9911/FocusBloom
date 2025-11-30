<script lang="ts">
  import draggable from '$lib/drag_and_drop/draggable'
  import dropzone from '$lib/drag_and_drop/dropzone'
  import { BASKET_CAPACITY, FRUIT_UPGRADE_COUNT } from '../../constants/pomodoro'
  import { callBackRegistry } from '../../global'
  import type { Fruit } from '../../types/pomodoro'
  import type { BasketProps } from './types'

  let {
    className,
    basket = $bindable<Fruit[]>(),
    disabled,
  }: BasketProps = $props()

  const handleReceive = (rewardFruit: Fruit) => {
    let calBasket = [...basket]
    const sameIdFruit = calBasket.find(fruit => fruit.id === rewardFruit.id)

    if (sameIdFruit) {
      return false
    }

    const sameLvlFruits = calBasket.filter(fruit => fruit.sprite === rewardFruit.sprite && fruit.level === rewardFruit.level)
    const nextLvlFruits = calBasket.filter(fruit => fruit.sprite === rewardFruit.sprite && fruit.level === rewardFruit.level + 1)

    const canUpgradeTwoLevels = sameLvlFruits.length == FRUIT_UPGRADE_COUNT - 1 && nextLvlFruits.length == FRUIT_UPGRADE_COUNT - 1
    const canUpgradeOneLevel = sameLvlFruits.length == FRUIT_UPGRADE_COUNT - 1

    // Double step upgrade
    if (canUpgradeTwoLevels && calBasket.length <= BASKET_CAPACITY) {
      const doubleNextLvlFruit: Fruit = {
        id: rewardFruit.id,
        sprite: rewardFruit.sprite,
        level: rewardFruit.level + 2
      }
      // clear to-be-merged fruits
      basket = basket.filter(fruit => !(fruit.sprite ===  rewardFruit.sprite))
      basket.push(doubleNextLvlFruit)

      return true
    }

    // Single step upgrade
    else if (canUpgradeOneLevel && calBasket.length <= BASKET_CAPACITY) {
      const upgradedFruit: Fruit = {
        id: rewardFruit.id,
        sprite: rewardFruit.sprite,
        level: rewardFruit.level + 1
      }
      basket = basket.filter(fruit => !(fruit.sprite === rewardFruit.sprite && fruit.level === rewardFruit.level))
      basket.push(upgradedFruit)

      return true
    } else if (calBasket.length <= BASKET_CAPACITY - 1) {
      basket.push(rewardFruit)

      return true
    }

    return false
  }

  const handlePickup = (movingFruit: Fruit) => {
    const removeDropFruit = () => {
      basket = basket.filter(fruit => fruit.id !== movingFruit.id)
    }

    callBackRegistry.set(movingFruit.id, removeDropFruit)
  }

  const handleDragEnd = (movingFruit: Fruit) => {
    callBackRegistry.delete(movingFruit.id)
  }

</script>

<div
  {@attach dropzone({ onDrop: handleReceive, isDroppable: disabled })}
  class="basket border-2 border-dashed {className}"
>
  {#if basket.length === 0}
    {#if disabled}
      <p class=" font-bold">The basket is locked</p>
    {:else}
      <p>Put your fruit here</p>
    {/if}
    
  {:else}
    <div class="flex gap-2">
      {#each basket as fruit}
        <div
          {@attach draggable({
              data: fruit,
              onDragStart: () => handlePickup(fruit),
              onDragEnd: () => handleDragEnd(fruit)
          })}
        >
        {#if fruit.level === 1}
          <span class="text-3xl">{fruit.sprite}</span><span class=" text-xs">{fruit.id}</span>
        {:else if fruit.level === 2}
          <span class="text-4xl animation-lv2">{fruit.sprite}</span><span class=" text-xs">{fruit.id}</span>
        {:else}
          <span class="text-5xl animation-lv3">{fruit.sprite}</span><span class=" text-xs">{fruit.id}</span>
        {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .basket {
    width: 33%;
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .animation-lv2 {
    border-radius: 20px;
    padding: 3px 5px;
    animation: inset-bg-lv2 1s linear infinite;
  }

  .animation-lv3 {
    border-radius: 25px;
    padding: 1px 6px;
    animation: inset-bg-lv3 1s linear infinite;
  }

  @keyframes inset-bg-lv2 {
    0% { box-shadow: lawngreen inset 0 -3px 5px 0; }
    25% { box-shadow: lawngreen inset -3px 0px 5px 0; }
    50% { box-shadow: lawngreen inset 0 3px 5px 0; }
    75% { box-shadow: lawngreen inset 3px 0px 5px 0; }
    100% { box-shadow: lawngreen inset 0 -3px 5px 0; }
  }

  @keyframes inset-bg-lv3 {
    0% { box-shadow: orangered inset 0 -5px 5px 0; }
    25% { box-shadow: orangered inset -5px 0px 5px 0; }
    50% { box-shadow: orangered inset 0 5px 5px 0; }
    75% { box-shadow: orangered inset 5px 0px 5px 0; }
    100% { box-shadow: orangered inset 0 -5px 5px 0; }
  }
</style>
