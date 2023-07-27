<script lang="ts">
  export let checked = false;
</script>

<button
  on:click={() => (checked = !checked)}
  class="inline-flex shrink-0 w-11 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:shadow-outline {checked
    ? 'bg-violet-600'
    : 'bg-gray-400'}"
>
  <span
    class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full {checked
      ? 'translate-x-5'
      : 'translate-x-0'}"
  >
  </span>
</button>
