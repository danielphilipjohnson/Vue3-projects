<template>
  <div>
    <div>
      <img
        src="https://media.giphy.com/media/JRsQiAN79bPWUv43Ko/giphy.gif"
        alt="placeholder"
      />
      {{ dummyUser }}
      <input v-model="newMessageText" class="input" type="text" />

      <button>Submit</button>
    </div>
    <p>Select a gif {{ searchText }}</p>
    <input @change="search($event)" class="input" type="text" />
    <div>
      <!-- Populate single gif image -->
      <template v-for="gif in gifs" :key="gif.id">
        <img :src="gif" alt="" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
// TODO on submit get the image url passed into submit button
import { GiphyFetch } from "@giphy/js-fetch-api";
import { createMessage } from "../firestore-client/";
import { getMessageCollection } from "../firestore-client/message";

import { defineComponent, PropType, Ref, ref } from "vue";
let API_KEY = process.env.VUE_APP_GIPHY_API_KEY;

export default defineComponent({
  props: {
    chatID: { type: String as PropType<string>, required: true },
    dummyUser: { type: Object as PropType<object>, required: true },
  },
  setup(chatID, dummyUser) {
    const jsonData: Ref<any> = ref([]);
    const gifs: Ref<any> = ref([]);
    const newMessageText = ref("");

    const searchText = ref("");

    const getGiphyData = async (searchTerm: string) => {
      if (API_KEY) {
        const gf = new GiphyFetch(API_KEY);
        const { data } = await gf.search(searchTerm, {
          sort: "relevant",
          limit: 10,
          type: "stickers",
        });

        jsonData.value = data;

        const fetchedGifs = data
          .map((gif) => gif.id)
          .map((gifId) => {
            return `https://media.giphy.com/media/${gifId}/giphy.gif`;
          });

        gifs.value = fetchedGifs;
        console.log(gifs);
      }
    };

    const search = (event: any) => {
      if (event.target.value) {
        searchText.value = event.target.value;

        getGiphyData(event.target.value);
      } else {
        console.log("empty");
      }
    };

    const newMessageRef = getMessageCollection(chatID.chatID);
    newMessageText.value = "testing from giphy";

    //createMessage(
    //  newMessageRef,
    //  newMessageText,
    //  "8T3UEDOiltWTgggrL2Lxk2651tj1",
    //  null,
    //  "https://media.giphy.com/media/JRsQiAN79bPWUv43Ko/giphy.gif"
    //);

    return {
      gifs,
      newMessageText,
      search,
      searchText,
    };
  },
});
</script>
