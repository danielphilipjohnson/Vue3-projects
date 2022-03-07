<template>
  <div>
    <div>
      <img :src="selectedGif" alt="placeholder" />
      <input v-model="newMessageText" class="input" type="text" />

      <button @click="sendGif()">Submit</button>
    </div>

    <p>Select a gif {{ searchText }}</p>
    <input @change="search($event)" class="input" type="text" />
    <div>
      <!-- Populate single gif image -->
      <template v-for="gif in gifs" :key="gif.id">
        <img :src="gif" alt="" @click="selectGif($event)" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
// TODO on submit get the image url passed into submit button
import { createMessage } from "../firestore-client/";
import { getMessageCollection } from "../firestore-client/message";
import { useGetSearchedGiphy } from "../composables/useGetSearchedGiphy";

import { defineComponent, PropType, Ref, ref } from "vue";
import { getAuth } from "firebase/auth";

export default defineComponent({
  props: {
    chatID: { type: String as PropType<string>, required: true },
    dummyUser: { type: Object as PropType<object>, required: true },
  },
  setup(chatID) {
    const auth = getAuth();

    const selectedGif = ref(
      "https://media.giphy.com/media/JRsQiAN79bPWUv43Ko/giphy.gif"
    );

    const gifs: Ref<any> = ref([]);
    const newMessageText = ref("");

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

    const newMessageRef = getMessageCollection(chatID.chatID);

    const selectGif = (event: Event) => {
      const target = event.target as HTMLImageElement;
      selectedGif.value = target.src;
    };

    const sendGif = () => {
      if (auth.currentUser?.uid) {
        createMessage(
          newMessageRef,
          newMessageText,
          auth.currentUser?.uid,
          null,
          selectedGif.value
        );
      } else {
        throw new Error("Couldnt send your message. Please try again.");
      }
    };

    return {
      gifs,
      newMessageText,
      search,
      searchText,
      sendGif,
      selectGif,
      selectedGif,
    };
  },
});
</script>
