<template>
  <div class="relative inline-block w-10 mr-2 align-middle select-none anim">
    <input
      v-model="inputValue"
      type="checkbox"
      name="toggle"
      class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-400 appearance-none cursor-pointer anim focus:shadow-none focus:outline-none"
    />
    <label
      for="toggle"
      class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-400 cursor-pointer anim"
    ></label>
  </div>
</template>

<script>
import { useModelWrapper } from "../utils";

export default {
  name: "MySwitch",
  props: {
    modelValue: {
      type: Boolean,
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

<style lang="postcss" scoped>
.anim {
  @apply transition duration-100 ease-in;
}

.toggle-checkbox:checked {
  @apply text-purple-600;
  @apply border-purple-600;
  transform: translateX(16px);
}
</style>
