<template>
  <div v-if="content" class="grid grid-cols-3 grid-rows-3 gap-8 min-h-full min-w-full">
    <div class="col-span-2 row-span-1 flex flex-col items-start">
      <h1 class="text-4xl mb-4">{{ content.title }}</h1>
      <my-button is-primary @click="showRandomResult">Random</my-button>
    </div>
    <div class="col-start-3 row-start-1 row-end-4">
      <h3 class="text-xl font-medium mb-2">Result options:</h3>
      <ul>
        <li v-for="option in content.options" :key="option" class="list-disc ml-8">
          <p class="text-base mb-2">{{ option.label }}</p>
        </li>
      </ul>
    </div>
    <div
      v-if="randomResult"
      class="col-span-1 col-start-2 row-span-1 text-4xl flex justify-center items-center"
    >
      Result:
      {{ randomResult }}
    </div>
  </div>
  <div v-else class="text-center text-lg">
    Go to <a href="/generate" class="text-blue-600 hover:underline">/generate</a> to
    generate link for this page
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import MyButton from "../components/MyButton.vue";
import { decodeContent } from "../utils";
import rwc from "random-weighted-choice";

export default {
  components: { MyButton },
  setup() {
    const route = useRoute();
    const content = decodeContent(route.query.content);

    const table = content.options.map((option) => ({
      weight: option.chance,
      id: option.label,
    }));

    const randomResult = ref("");

    const getRandomResult = () => rwc(table);

    const showRandomResult = () => {
      const optionsCount = content.options.length;
      let idx = 0;

      const intervalId = setInterval(() => {
        randomResult.value = content.options[idx % optionsCount].label;
        idx++;
      }, 100);

      setTimeout(() => {
        clearInterval(intervalId);
        randomResult.value = getRandomResult();
      }, 3000);
    };

    return {
      content,
      randomResult,
      showRandomResult,
    };
  },
};
</script>
