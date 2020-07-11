<template>
  <my-input
    v-model="state.title"
    type="text"
    class="mb-12 text-2xl"
    placeholder="Title"
  />
  <div
    v-for="(option, index) in state.options"
    :key="option"
    class="flex justify-between items-center mb-5"
  >
    <my-input
      v-model="option.label"
      class="w-2/3"
      type="text"
      placeholder="Option label"
    />
    <my-input
      v-model="option.chance"
      class="w-1/6"
      type="number"
      placeholder="Option chance (in %)"
      min="0"
      max="100"
    />
    <cross-button @click="removeOption(index)" />
  </div>
  <div class="flex justify-end items-center">
    <p class="mr-4">Chance sum: {{ chanceSum }}</p>
    <my-button @click="addOption">
      Add option
    </my-button>
  </div>
  <my-button
    v-if="!errorMessage"
    id="copyLinkBtn"
    data-clipboard-target="#link"
    is-primary
  >
    {{ isCopied ? "Copied!" : "Copy link to clipboard" }}
  </my-button>
  <div v-if="errorMessage" class="mt-4 py-4 text-red-700 text-lg">
    {{ errorMessage }}
  </div>
  <div v-if="!errorMessage" id="link" class="mt-4 p-4 bg-white" contenteditable>
    {{ link }}
  </div>
</template>

<script>
import { reactive, ref, computed, watchEffect } from "vue";
import Clipboard from "clipboard";
import MyButton from "../components/MyButton.vue";
import MyInput from "../components/MyInput.vue";
import CrossButton from "../components/CrossButton.vue";
import { encodeContent } from "../utils";

export default {
  components: { MyButton, MyInput, CrossButton },
  setup() {
    const state = reactive({
      title: "",
      options: [
        {
          label: "",
          chance: 0,
        },
      ],
    });

    const chanceSum = computed(() => {
      return state.options.reduce((sum, option) => {
        return sum + option.chance;
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

    const validateTitle = () => state.title !== "";

    const validateOptionsLength = () => state.options.length !== 0;

    const validateOptionsLabels = () => {
      for (const option of state.options) {
        if (option.label === "") {
          return false;
        }
      }

      return true;
    };

    const validateChanceSum = () => {
      if (chanceSum.value !== 100) {
        return false;
      }

      return true;
    };

    const StateValidEnum = Object.freeze({
      Valid: 0,
      ErrorTitle: 1,
      ErrorOptionsLength: 2,
      ErrorOptionsLabels: 3,
      ErrorChanceSum: 4,
    });

    function validateState() {
      if (!validateTitle()) {
        return StateValidEnum.ErrorTitle;
      }
      if (!validateOptionsLength()) {
        return StateValidEnum.ErrorOptionsLength;
      }
      if (!validateOptionsLabels()) {
        return StateValidEnum.ErrorOptionsLabels;
      }
      if (!validateChanceSum()) {
        return StateValidEnum.ErrorChanceSum;
      }

      return StateValidEnum.Valid;
    }

    function getErrorMessage(validateStateResult) {
      switch (validateStateResult) {
        case StateValidEnum.Valid:
          return "";
        case StateValidEnum.ErrorTitle:
          return "Please, enter a title";
        case StateValidEnum.ErrorOptionsLength:
          return "There must be at least 1 option";
        case StateValidEnum.ErrorOptionsLabels:
          return "Please, enter a label's for all options";
        case StateValidEnum.ErrorChanceSum:
          return "Sum of option's chances must be = 100";
        default:
          return "Unknown error";
      }
    }

    watchEffect(() => {
      const validateStateResult = validateState();

      const isStateValid = validateStateResult === StateValidEnum.Valid;

      if (isStateValid) {
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

    return {
      state,
      link,
      chanceSum,
      isCopied,
      errorMessage,
      addOption,
      removeOption,
    };
  },
};
</script>
