<template>
  <div>
    <div v-show="displayGiphy">
      <SelectedGif :selectedGif="selectedGif" :chatID="chatID" />

      <p>Select a gif {{ searchText }}</p>
      <input @change="search($event)" class="input" type="text" />

      <GiphyCards :gifs="gifs" @some-event="selectGif($event)" />
    </div>
    <button @click="showGiphy()">show gif</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from "vue";
import { useGetSearchedGiphy } from "../composables/useGetSearchedGiphy";

import GiphyCards from "./GiphyCards.vue";
import SelectedGif from "./SelectedGif.vue";

export default defineComponent({
  components: {
    GiphyCards,
    SelectedGif,
  },
  props: {
    chatID: { type: String as PropType<string | string[]>, required: true },
    dummyUser: { type: Object as PropType<object>, required: true },
  },
  setup() {
    const selectedGif = ref(
      "https://media.giphy.com/media/JRsQiAN79bPWUv43Ko/giphy.gif"
    );

    const gifs: Ref<Array<string>> = ref([]);
    const displayGiphy = ref(false);
    const searchText = ref("");

    const search = async (event: Event) => {
      const target = event.target as HTMLInputElement;

      if (target.value) {
        searchText.value = target.value;

        const { formattedGifs } = await useGetSearchedGiphy(target.value);
        gifs.value = formattedGifs;
      } else {
        throw new Error("Empty input: to be implemented");
      }
    };

    const selectGif = (event: Event) => {
      const target = event.target as HTMLImageElement;
      selectedGif.value = target.src;
    };

    const showGiphy = () => {
      displayGiphy.value = !displayGiphy.value;
    };

    return {
      gifs,
      searchText,
      selectedGif,
      displayGiphy,
      search,
      selectGif,
      showGiphy,
    };
  },
});
</script>
