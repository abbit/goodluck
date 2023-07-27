<script lang="ts">
  export let primary = false;
</script>

<button
  on:click
  class="text-base font-medium py-3 rounded-lg w-48 {primary
    ? 'bg-violet-600 hover:bg-violet-700 text-white'
    : 'text-violet-600 hover:text-violet-700'}"
>
  <slot />
</button>
