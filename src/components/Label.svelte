<script lang="ts">
  export let name: string;
  export let label: string;
</script>

<label for={name} class="text-gray-600 block {$$props.class}">{label}</label>
