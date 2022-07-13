<template>
  <label :for="name" class="text-gray-600 block">{{ label }}</label>
</template>

<script setup lang="ts">
  defineProps<{
    name: string
    label: string
  }>()
</script>
