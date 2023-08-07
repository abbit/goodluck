<script lang="ts">
  export let value = "";
  export let error = false;
</script>

<input {...$$restProps} bind:value on:input on:beforeinput class:error />

<style lang="postcss">
  input {
    @apply block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 leading-normal focus:outline-none focus:ring focus:ring-violet-600;

    &.error {
      @apply ring-2 ring-red-500;
    }
  }
</style>
