<script lang="ts">
  export let primary = false;
  export let noAnimation = false;
</script>

<button on:click class:primary class:noAnimation>
  <slot />
</button>

<style lang="postcss">
  button {
    @apply flex w-48 items-center justify-center rounded-lg border-2 border-transparent py-3 text-base font-medium text-violet-600;

    &.primary {
      @apply bg-violet-600 text-white transition duration-200 ease-out hover:bg-violet-700 active:scale-95;
    }

    &.noAnimation {
      @apply transition-none active:scale-100;
    }
  }
</style>
