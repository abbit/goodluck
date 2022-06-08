<template>
  <MyLabel name="title" label="Title" class="text-2xl font-medium" />
  <MyInput
    v-model="state.title"
    name="title"
    type="text"
    class="mb-12 text-2xl"
  />

  <div
    v-for="(option, index) in state.options"
    :key="option"
    class="flex justify-between items-end mb-5"
  >
    <div class="w-2/3">
      <MyLabel name="label" label="Option label" />
      <MyInput v-model="option.label" name="label" type="text" />
    </div>

    <div class="w-1/6">
      <MyLabel name="lable" label="Option chance (in %)" />
      <MyInput
        v-model="option.chance"
        name="chance"
        type="number"
        min="0"
        max="100"
      />
    </div>

    <CrossmarkButton class="mb-2" @click="removeOption(index)" />
  </div>

  <div class="flex justify-end items-center">
    <div class="mr-8 flex">
      <SwitchGroup as="div" class="flex items-center space-x-4">
        <SwitchLabel>Equal chances</SwitchLabel>

        <Switch
          v-slot="{ checked }"
          v-model="state.isChancesEqual"
          as="button"
          class="relative inline-flex shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline"
          :class="state.isChancesEqual ? 'bg-violet-600' : 'bg-gray-400'"
        >
          <span
            class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full"
            :class="{ 'translate-x-5': checked, 'translate-x-0': !checked }"
          />
        </Switch>
      </SwitchGroup>
    </div>
    <p class="mr-4">Chance sum: {{ chanceSum }}</p>
    <MyButton @click="addOption">Add option</MyButton>
  </div>

  <MyButton
    v-if="!errorMessage"
    id="copyLinkBtn"
    data-clipboard-target="#link"
    is-primary
  >
    {{ isCopied ? "Copied!" : "Copy link to clipboard" }}
  </MyButton>

  <div v-if="errorMessage" class="mt-4 py-4 text-red-700 text-lg">
    {{ errorMessage }}
  </div>
  <div v-else id="link" class="mt-4 p-4 bg-white" contenteditable>
    {{ link }}
  </div>
</template>

<script setup>
import { reactive, ref, computed, watchEffect } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import Clipboard from "clipboard";
import MyButton from "../components/MyButton.vue";
import MyInput from "../components/MyInput.vue";
import MyLabel from "../components/MyLabel.vue";
import CrossmarkButton from "../components/CrossmarkButton.vue";
import { encodeContent } from "../utils";
import { validateState, getErrorMessage, isStateValid } from "../validators";

const state = reactive({
  title: "",
  isChancesEqual: false,
  options: [
    {
      label: "",
      chance: 0,
    },
  ],
});

const chanceSum = computed(() => {
  if (state.isChancesEqual) {
    return 100;
  }

  return state.options.reduce((sum, option) => {
    return sum + parseFloat(option.chance);
  }, 0);
});

const link = ref("");

const errorMessage = ref("this is an error");

const isCopied = ref(false);

const clipboard = new Clipboard("#copyLinkBtn");

function addOption() {
  state.options.push({
    label: "",
    chance: 0,
  });
}

function removeOption(index) {
  state.options.splice(index, 1);
}

function generateLink() {
  const url = new URL(window.location.origin);

  url.searchParams.append("content", encodeContent(state));

  link.value = url.href;
}

watchEffect(() => {
  if (state.isChancesEqual) {
    state.options = state.options.map((opt) => {
      opt.chance = ((1 / state.options.length) * 100).toFixed(2);
      return opt;
    });
  }
  const validateStateResult = validateState(state, chanceSum.value);

  if (isStateValid(validateStateResult)) {
    generateLink();
  }

  errorMessage.value = getErrorMessage(validateStateResult);
});

clipboard.on("success", () => {
  isCopied.value = true;

  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
});
</script>
