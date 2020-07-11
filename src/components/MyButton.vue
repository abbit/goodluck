<template>
  <button
    class="text-base font-medium py-3 rounded-lg w-48"
    :class="{
      'bg-purple-600 hover:bg-purple-700 text-white': isPrimary,
      'text-purple-600 hover:text-purple-700': !isPrimary,
    }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    isPrimary: Boolean,
  },
};
</script>
