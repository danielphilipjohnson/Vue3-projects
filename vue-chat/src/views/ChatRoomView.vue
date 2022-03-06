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
        <div v-show="displayGiphy">
          <GiphyContainer :dummyUser="user" :chatID="chatID" />
        </div>
        <button @click="showGiphy()">show gif</button>

        <input v-model="newMessageText" class="input" />
        <div v-show="displayEmoji">
          <VuemojiPicker @emojiClick="handleEmojiClick" />
        </div>
        <button @click="showEmoji()">:D</button>

        <button
          :disabled="(!newMessageText && !newAudio) || loading"
          class="button is-success"
          @click="addMessage(user.uid)"
        >
          Send
        </button>

        <h5>Record Audio</h5>

        <button v-if="!recorder" @click="record()" class="button is-info">
          Record Voice
        </button>

        <button v-else @click="stop()" class="button is-danger">Stop</button>

        <br />

        <audio v-if="newAudio" :src="newAudioURL" controls></audio>

        <hr />
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

import { upLoadAudioClip } from "../firestore-client/message";
import { defineComponent } from "@vue/runtime-core";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { createMessage } from "../firestore-client/";

import { VuemojiPicker, EmojiClickEventDetail } from "vuemoji-picker";
import GiphyContainer from "../components/GiphyContainer.vue";

export default defineComponent({
  components: {
    UserBlock,
    TheLogin,
    ChatMessage,
    VuemojiPicker,
    GiphyContainer,
  },
  setup(user) {
    const newMessageText = ref("");
    const loading = ref(false);

    const route = useRoute();
    const chatID = computed(() => {
      return route.params.id;
    });

    const displayEmoji = ref(false);
    const displayGiphy = ref(false);

    const showEmoji = () => {
      displayEmoji.value = !displayEmoji.value;
    };

    const showGiphy = () => {
      displayGiphy.value = !displayGiphy.value;
    };

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
            await createMessage(
              newMessageRef,
              newMessageText,
              uid,
              downloadURL
            );

            newMessageText.value = "";
          });
        }
      } else {
        createMessage(newMessageRef, newMessageText, uid);
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
      addMessage,
      loading,
      messages,
      newAudio,
      recorder,
      newAudioURL,
      record,
      stop,
      handleEmojiClick,
      showEmoji,
      displayEmoji,
      showGiphy,
      displayGiphy,
    };
  },
});
</script>
