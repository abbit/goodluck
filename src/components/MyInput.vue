<template>
  <input
    v-model="inputValue"
    :name="name"
    class="bg-white focus:outline-none focus:ring border border-gray-300 focus:ring-violet-600 rounded-lg py-2 px-4 block appearance-none leading-normal w-full"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    modelValue: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
    get: () => props['modelValue'],
    set: (value) => emit(`update:modelValue`, value),
})
</script>

<style lang="postcss" scoped>
input[type="number"] {
  @apply px-1 sm:px-4;
}
</style>
