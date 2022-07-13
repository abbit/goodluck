<template>
  <button
    class="text-base font-medium py-3 rounded-lg w-48"
    :class="{
      'bg-violet-600 hover:bg-violet-700 text-white': isPrimary,
      'text-violet-600 hover:text-violet-700': !isPrimary,
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  defineProps<{ isPrimary?: boolean }>()
</script>
