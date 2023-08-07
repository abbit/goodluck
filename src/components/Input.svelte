<script lang="ts">
  export let value = "";
  export let error = false;
  let class_ = "";
  export { class_ as class };
</script>

<input
  bind:value
  on:input
  {...$$restProps}
  class="bg-white focus:outline-none focus:ring border border-gray-300 focus:ring-violet-600 rounded-lg py-2 px-4 block appearance-none leading-normal w-full {error
    ? 'ring-2 ring-red-500'
    : ''} {class_}"
/>
