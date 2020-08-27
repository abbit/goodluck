<template>
  <label :for="name" class="text-gray-600 block">{{ label }}</label>
</template>

<script>
export default {
  name: "MyLabel",
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
