<script lang="ts">
  export let value;
  export let type = "text";
  let class_ = "";
  export { class_ as class };

  function setType(node: HTMLInputElement) {
    node.type = type;
  }
</script>

<input
  bind:value
  use:setType
  {...$$restProps}
  class="bg-white focus:outline-none focus:ring border border-gray-300 focus:ring-violet-600 rounded-lg py-2 px-4 block appearance-none leading-normal w-full {class_}"
/>
