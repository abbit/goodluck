<template>
  <input
    v-model="inputValue"
    :name="name"
    class="bg-white focus:outline-none focus:ring border border-gray-300 focus:ring-violet-600 rounded-lg py-2 px-4 block appearance-none leading-normal w-full"
  />
</template>

<script>
import { useModelWrapper } from "../utils";

export default {
  name: "MyInput",
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    return {
      inputValue: useModelWrapper(props, emit),
    };
  },
};
</script>

<style lang="postcss" scoped>
input[type="number"] {
  @apply px-1 sm:px-4;
}
</style>
