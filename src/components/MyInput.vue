<template>
  <input
    v-model="inputValue"
    class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
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
  },
  setup(props, { emit }) {
    return {
      inputValue: useModelWrapper(props, emit),
    };
  },
};
</script>
