<template>
  <my-label name="title" label="Title" class="text-xl font-medium" />
  <my-input
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
      <my-label name="label" label="Option label" class="text-sm font-light" />
      <my-input v-model="option.label" name="label" type="text" />
    </div>

    <div class="w-1/6">
      <my-label
        name="lable"
        label="Option chance (in %)"
        class="text-sm font-light"
      />
      <my-input
        v-model="option.chance"
        name="chance"
        type="number"
        min="0"
        max="100"
      />
    </div>

    <crossmark-button class="mb-2" @click="removeOption(index)" />
  </div>

  <div class="flex justify-end items-center">
    <div class="mr-8 flex">
      <p class="mr-2">Equal chances</p>
      <my-switch v-model="state.isChancesEqual" />
    </div>
    <p class="mr-4">Chance sum: {{ chanceSum }}</p>
    <my-button @click="addOption">Add option</my-button>
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
  <div v-else id="link" class="mt-4 p-4 bg-white" contenteditable>
    {{ link }}
  </div>
</template>

<script>
import { reactive, ref, computed, watchEffect } from "vue";
import Clipboard from "clipboard";
import MyButton from "../components/MyButton.vue";
import MyInput from "../components/MyInput.vue";
import MyLabel from "../components/MyLabel.vue";
import MySwitch from "../components/MySwitch.vue";
import CrossmarkButton from "../components/CrossmarkButton.vue";
import { encodeContent } from "../utils";
import { validateState, getErrorMessage, isStateValid } from "../validators";

export default {
  components: { MyButton, MyInput, MyLabel, MySwitch, CrossmarkButton },
  setup() {
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
