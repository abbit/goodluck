<script lang="ts">
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import Label from "../components/Label.svelte";
  import CrossmarkButton from "../components/CrossmarkButton.svelte";
  import {
    getTotalChance,
    initState,
    addOption,
    removeOption,
    serializeState,
    setIsChancesEqual,
  } from "../state";
  import {
    validateState,
    isStateValid,
    getStateValidationErrorMessage,
  } from "../validators";
  import { Link } from "svelte-routing";
  import Switch from "../components/Switch.svelte";

  let state = initState();
  let isChancesEqual = false;
  $: state = setIsChancesEqual(state, isChancesEqual); // updates state options chances when isChancesEqual or state itself changes
  $: totalChance = getTotalChance(state);

  let luckPagePath = "";
  let fullLink = "";
  let error = "";

  $: {
    const stateValidationStatus = validateState(state);
    error = getStateValidationErrorMessage(stateValidationStatus);

    if (isStateValid(stateValidationStatus)) {
      luckPagePath = serializeState(state);
      fullLink = `${window.location.origin}/${luckPagePath}`;
    }
  }

  let isCopied = false;

  function copyLinkToClipboard() {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available");
      return;
    }

    navigator.clipboard.writeText(fullLink);

    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }
</script>

<Label name="title" label="Title" class="text-2xl font-medium" />
<Input
  bind:value={state.title}
  name="title"
  type="text"
  class="mb-12 text-2xl"
/>

{#each state.options as option, index (index)}
  <div class="flex justify-between items-end mb-5">
    <div class="w-2/3">
      <Label name="label" label="Option label" />
      <Input bind:value={option.label} name="label" type="text" />
    </div>

    <div class="w-1/6">
      <Label name="lable" label="Option chance (in %)" />
      <Input
        bind:value={option.chance}
        type="number"
        name="chance"
        min="0"
        max="100"
      />
    </div>

    <CrossmarkButton
      class="mb-2"
      on:click={() => (state = removeOption(state, index))}
    />
  </div>
{/each}

<div class="flex justify-end items-center">
  <div class="mr-8 flex">
    <Label name="equal-chances" label="Equal chances" class="mr-2" />
    <Switch bind:checked={isChancesEqual} />
  </div>
  <p class="mr-4">Chance sum: {totalChance}</p>
  <Button on:click={() => (state = addOption(state))}>Add option</Button>
</div>

{#if error}
  <div class="mt-4 py-4 text-red-700 text-lg">
    {error}
  </div>
{:else}
  <div class="flex gap-8 items-center">
    <Link
      to={luckPagePath}
      class="text-base font-medium py-3 rounded-lg w-48 bg-violet-600 hover:bg-violet-700 text-white text-center"
    >
      Go to Luck page
    </Link>
    <Button on:click={copyLinkToClipboard}>
      {isCopied ? "Copied!" : "Copy link to clipboard"}
    </Button>
  </div>
  <div class="mt-4 p-4 bg-white break-all">
    {fullLink}
  </div>
{/if}
