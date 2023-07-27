<script lang="ts">
  export let name: string;
  export let label: string;
  let class_ = "";
  export { class_ as class };
</script>

<label for={name} class="text-gray-600 block {class_}">{label}</label>
