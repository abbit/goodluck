<template>
  <div
    class="grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-8 min-h-full min-w-full"
  >
    <div class="col-span-2 row-span-1 flex flex-col items-start">
      <h1 class="text-4xl mb-4">{{ state.title }}</h1>
      <MyButton is-primary @click="showRandomResult">Random</MyButton>
    </div>
    <div class="col-start-3 row-start-1 row-end-4">
      <h3 class="text-xl font-medium mb-2">Result options:</h3>
      <ul>
        <li
          v-for="option in state.options"
          :key="option.label"
          class="list-disc ml-8"
        >
          <p class="text-base mb-2">{{ option.label }}</p>
        </li>
      </ul>
    </div>
    <div
      v-if="randomResult"
      class="col-span-1 col-start-2 row-span-1 text-4xl flex justify-center items-center"
    >
      Result:
      {{ randomResult }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { useRoute } from "vue-router"
  import MyButton from "../components/MyButton.vue"
  import { deserializeState } from "../utils"
  import rwc from "random-weighted-choice"

  const route = useRoute()

  const state = deserializeState(route.params.state as string)

  const table = state.options.map((option) => ({
    weight: parseFloat(option.chance),
    id: option.label,
  }))

  const randomResult = ref("")

  const getRandomResult = (): string => rwc(table)

  const showRandomResult = (): void => {
    const optionsCount = state.options.length
    let idx = 0

    const intervalId = setInterval(() => {
      randomResult.value = state.options[idx % optionsCount].label
      idx++
    }, 100)

    setTimeout(() => {
      clearInterval(intervalId)
      randomResult.value = getRandomResult()
    }, 3000)
  }
</script>
