<script lang="ts">
  import Button from "../components/Button.svelte";
  import { deserializeState, selectRandomOption } from "../state";

  export let state = "";

  const stateObj = deserializeState(state);
  let result = "";

  function showRandomResult() {
    const optionsCount = stateObj.options.length;
    let idx = 0;

    const intervalId = setInterval(() => {
      result = stateObj.options[idx].label;
      idx = (idx + 1) % optionsCount;
    }, 100);

    setTimeout(() => {
      clearInterval(intervalId);
      result = selectRandomOption(stateObj).label;
    }, 3000);
  }
</script>

<div class="grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-8 min-h-full min-w-full">
  <div class="col-span-2 row-span-1 flex flex-col items-start">
    <h1 class="text-4xl mb-4">{stateObj.title}</h1>
    <Button primary on:click={showRandomResult}>Random</Button>
  </div>
  <div class="col-start-3 row-start-1 row-end-4">
    <h3 class="text-xl font-medium mb-2">Options:</h3>
    <ul>
      {#each stateObj.options as option (option.label)}
        <li class="list-disc ml-8">
          <p class="text-base mb-2">{option.label}</p>
        </li>
      {/each}
    </ul>
  </div>
  {#if result}
    <div
      class="col-span-1 col-start-2 row-span-1 text-4xl flex justify-center items-center"
    >
      {result}
    </div>
  {/if}
</div>
