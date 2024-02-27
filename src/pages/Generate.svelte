<script lang="ts">
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import Label from "../components/Label.svelte";
  import CrossmarkButton from "../components/CrossmarkButton.svelte";
  import {
    getTotalWeight,
    initState,
    addOption as addOptionToState,
    removeOption as removeOptionFromState,
    serializeState,
    setEqualWeights,
    setTitle,
    setOptionWeight,
    updateWeights,
  } from "../state";
  import {
    validateState,
    isStateValid,
    getStateValidationErrorMessage,
  } from "../validators";
  import { Link } from "svelte-routing";
  import Switch from "../components/Switch.svelte";

  // input fields' values are stored separately from state,
  // because they can be invalid at some moment (e.g. "1/" for 1/2)
  let weights = ["1"];
  let isWeightsEqual = true;
  $: if (isWeightsEqual) {
    weights = weights.map(() => "1");
  }

  let state = initState();
  let error = "";

  // update state options weights when isWeightsEqual or state itself changes
  $: state = setEqualWeights(state, isWeightsEqual);
  $: {
    try {
      state = updateWeights(state, weights);
      error = "";
    } catch (e) {
      error = e.message;
    }
  }
  $: totalWeight = error ? "-" : getTotalWeight(state).toFraction(true);

  let luckPagePath = "";
  let fullLink = "";

  $: if (error === "") {
    const stateValidationStatus = validateState(state);
    error = getStateValidationErrorMessage(stateValidationStatus);

    if (isStateValid(stateValidationStatus)) {
      luckPagePath = serializeState(state);
      fullLink = `${window.location.origin}/${luckPagePath}`;
    }
  }

  function addOption() {
    weights = [...weights, "1"];
    state = addOptionToState(state);
  }

  function removeOption(index: number) {
    weights = weights.filter((_, i) => i !== index);
    state = removeOptionFromState(state, index);
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
  class="mb-8 text-2xl"
/>

{#each state.options as _, index (index)}
  <div class="flex flex-col mb-4">
    <div class="font-medium text-lg text-gray-800">Option {index + 1}</div>
    <div class="flex justify-between items-end">
      <div class="w-[70%]">
        <Label name="label" label="Label" />
        <Input
          bind:value={state.options[index].label}
          name="label"
          type="text"
        />
      </div>

      <div class="w-[15%]">
        <Label name="weight" label="Weight" />
        <Input
          bind:value={weights[index]}
          on:beforeinput={() => (isWeightsEqual = false)}
          name="weight"
          inputmode="decimal"
        />
      </div>

      <CrossmarkButton class="mb-2" on:click={() => removeOption(index)} />
    </div>
  </div>
{/each}

<div class="flex justify-between items-center mb-4">
  <Button on:click={addOption}>Add option</Button>
  <div class="mr-8 flex">
    <div class="mr-8 flex">
      <Label name="equal-weights" label="Equal weights" class="mr-2" />
      <Switch bind:checked={isWeightsEqual} />
    </div>
    <p class="mr-4">Total weight: {totalWeight}</p>
  </div>
</div>

{#if error}
  <div class="mt-4 py-4 text-red-700 text-lg">
    {error}
  </div>
{:else}
  <div class="flex gap-8 items-center">
    <Link to={luckPagePath}>
      <Button primary noAnimation>Go to Luck page</Button>
    </Link>
    <Button on:click={copyLinkToClipboard}>
      {isCopied ? "Copied!" : "Copy link to clipboard"}
    </Button>
  </div>
  <div class="mt-4 p-4 bg-white break-all rounded-lg">
    {fullLink}
  </div>
{/if}
