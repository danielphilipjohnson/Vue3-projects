<template>
  <div>
    <img :src="selectedGif" alt="placeholder" />
    <input v-model="newMessageText" class="input" type="text" />
    <button @click="sendGif(selectedGif)">Submit</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from "vue";
import { getAuth } from "firebase/auth";
import { createMessage, getMessageCollection } from "../firestore-client/";
import { DocumentData } from "@firebase/firestore-types";

export default defineComponent({
  props: {
    selectedGif: {
      type: String as PropType<string>,
      required: true,
    },
    chatID: { type: String as PropType<string | string[]>, required: true },
  },
  setup(chatID) {
    const auth = getAuth();
    const newMessageText = ref("");

    const parsedChatID = !Array.isArray(chatID.chatID) ? chatID.chatID : "";

    const newMessageRef: Ref<DocumentData> = ref(
      getMessageCollection(parsedChatID)
    );

    const sendGif = (selectedGif: string) => {
      if (auth.currentUser?.uid) {
        createMessage({
          newMessageRef,
          newMessageText,
          uid: auth.currentUser?.uid,
          gifURL: selectedGif,
        });
      } else {
        throw new Error("Couldnt send your message. Please try again.");
      }
    };

    return {
      sendGif,
      newMessageText,
    };
  },
});
</script>
