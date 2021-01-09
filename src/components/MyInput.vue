<template>
  <input
    v-model="inputValue"
    :name="name"
    class="bg-white focus:outline-none focus:ring border border-gray-300 focus:ring-purple-600 rounded-lg py-2 px-4 block appearance-none leading-normal w-full"
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
  @apply px-1;

  @media (min-width: 640px) {
    @apply px-4;
  }
}
</style>
