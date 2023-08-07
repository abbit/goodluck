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
  } from "../state";
  import {
    validateState,
    isStateValid,
    getStateValidationErrorMessage,
  } from "../validators";
  import { Link } from "svelte-routing";
  import Switch from "../components/Switch.svelte";
  import Fraction from "fraction.js";

  let title = "?";
  let weights = ["1"]; // input field values are stored separately from state, because they can be invalid fractions (e.g. "abc123")
  let isWeightsEqual = true;
  $: if (isWeightsEqual) {
    weights = weights.map(() => "1");
  }

  let state = initState();
  $: state = setTitle(state, title); // updates state title when title or state itself changes
  $: state = setEqualWeights(state, isWeightsEqual); // updates state options weights when isWeightsEqual or state itself changes
  $: totalWeight = getTotalWeight(state).toFraction(true);

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

  function addOption() {
    weights = [...weights, "1"];
    state = addOptionToState(state);
  }

  function removeOption(index: number) {
    weights = weights.filter((_, i) => i !== index);
    state = removeOptionFromState(state, index);
  }

  function updateWeight(event: Event, index: number) {
    let weightString = (event.target as HTMLInputElement).value;
    weightString = weightString.replace(",", ".");
    if (weightString.endsWith(".")) {
      weightString += "0";
    }

    try {
      const frac = new Fraction(weightString);
      state = setOptionWeight(state, index, frac);
      isWeightsEqual = false;
    } catch (e) {
      console.error(e);
      error = `Invalid weight value "${weightString}" for option ${index + 1}`;
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
<Input bind:value={title} name="title" type="text" class="mb-8 text-2xl" />

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
          on:input={(e) => updateWeight(e, index)}
          name="weight"
          inputmode="decimal"
        />
      </div>

      <CrossmarkButton class="mb-2" on:click={() => removeOption(index)} />
    </div>
  </div>
{/each}

<div class="flex justify-end items-center mb-4">
  <div class="mr-8 flex">
    <Label name="equal-weights" label="Equal weights" class="mr-2" />
    <Switch bind:checked={isWeightsEqual} />
  </div>
  <p class="mr-4">Total weight: {totalWeight}</p>
  <Button on:click={addOption}>Add option</Button>
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
  <div class="mt-4 p-4 bg-white break-all rounded-lg">
    {fullLink}
  </div>
{/if}
