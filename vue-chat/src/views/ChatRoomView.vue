<template>
  <main class="section">
    <h3>Welcome to ChatRoom.vue {{ chatID }}</h3>

    <UserBlock v-slot="{ user }">
      <div v-if="user">
        <ul>
          <li v-for="message of messages" :key="message.id">
            <ChatMessage
              :message="message"
              :owner="user.uid === message.sender"
            />
          </li>
        </ul>

        <GiphyContainer :dummyUser="user" :chatID="chatID" />

        <input v-model="newMessageText" class="input" />

        <EmojiContainer @handleEmojiClick="handleEmojiClick" />

        <button
          :disabled="(!newMessageText && !newAudio) || loading"
          class="button is-success"
          @click="addMessage(user.uid)"
        >
          Send
        </button>

        <AudioPlayer
          :recorder="recorder"
          @audio-record="record()"
          @audio-stop="stop()"
          :newAudio="newAudio"
          :newAudioURL="newAudioURL"
        />
      </div>

      <TheLogin v-else />
    </UserBlock>
  </main>
</template>
<script lang="ts">
import { db } from "../firebase";
import { useGetLatestMessages } from "../composables/useGetLastestMessages";
import { useRecordChat } from "../composables/useRecordChat";

import { getStorage, ref as firestoreRef } from "firebase/storage";
import { collection, doc } from "firebase/firestore";

import UserBlock from "../components/UserBlock.vue";
import TheLogin from "../components/TheLogin.vue";
import ChatMessage from "../components/ChatMessage.vue";
import EmojiContainer from "../components/EmojiContainer.vue";
import AudioPlayer from "@/components/AudioPlayer.vue";

import { upLoadAudioClip } from "../firestore-client/message";
import { defineComponent } from "@vue/runtime-core";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { createMessage } from "../firestore-client/";

import GiphyContainer from "../components/GiphyContainer.vue";
import { EmojiClickEventDetail } from "vuemoji-picker";

export default defineComponent({
  components: {
    UserBlock,
    TheLogin,
    ChatMessage,
    GiphyContainer,
    EmojiContainer,
    AudioPlayer,
  },
  setup() {
    const newMessageText = ref("");
    const loading = ref(false);

    const route = useRoute();
    const chatID = computed(() => {
      return route.params.id;
    });

    const { messages } = useGetLatestMessages(chatID);

    const { record, stop, recorder, newAudio } = useRecordChat();

    const addMessage = async (uid: string) => {
      loading.value = true;

      const collectionRef = collection(
        db,
        "chats",
        `${chatID.value}`,
        "messages"
      );
      const storage = getStorage();

      // Add a new document with a generated id
      const newMessageRef = doc(collectionRef);

      // If there is a audio recorded
      if (newAudio.value) {
        if (!Array.isArray(chatID.value)) {
          const ext = firestoreRef(
            storage,
            "chats/" + chatID.value + "/" + newMessageRef.id + ".wav"
          );

          upLoadAudioClip(ext, newAudio.value, async (downloadURL) => {
            await createMessage({
              newMessageRef,
              newMessageText,
              uid,
              downloadURL,
            });
            console.log("uploaded clip successfully");
            newMessageText.value = "";
          });
        }
      } else {
        createMessage({ newMessageRef, newMessageText, uid });
        newMessageText.value = "";
      }

      loading.value = false;
      newAudio.value = null;
    };

    const newAudioURL = computed(() => {
      if (newAudio.value) {
        return URL.createObjectURL(newAudio.value);
      }
      return "";
    });

    const handleEmojiClick = (detail: EmojiClickEventDetail) => {
      newMessageText.value += detail.unicode;
    };

    return {
      newMessageText,
      chatID,

      loading,
      messages,
      newAudio,
      recorder,
      newAudioURL,
      record,
      stop,
      addMessage,
      handleEmojiClick,
    };
  },
});
</script>
