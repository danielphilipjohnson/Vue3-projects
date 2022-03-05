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

        <input v-model="newMessageText" class="input" />

        <button
          :disabled="!newMessageText || loading"
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
import {
  collection,
  doc,
  query,
  orderBy,
  limitToLast,
  setDoc,
  getDocs,
  DocumentData,
} from "firebase/firestore";

import UserBlock from "../components/UserBlock.vue";
import TheLogin from "../components/TheLogin.vue";
import ChatMessage from "../components/ChatMessage.vue";

import { defineComponent } from "@vue/runtime-core";
import { computed, Ref, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    UserBlock,
    TheLogin,
    ChatMessage,
  },
  setup() {
    const route = useRoute();
    const chatID = computed(() => {
      return route.params.id;
    });

    const newMessageText = ref("");
    const loading = ref(false);
    const messages: Ref = ref([]);
    const newAudio: Ref<Blob | MediaSource | null> = ref(null);
    const recorder: Ref = ref(null);

    const chatQuery = query(
      collection(db, "chats", `${chatID.value}`, "messages"),
      orderBy("createdAt"),
      limitToLast(10)
    );

    const setMessages = async () => {
      const querySnapshot = await getDocs(chatQuery);
      const fireStoremessages: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        fireStoremessages.push(doc.data());
      });
      messages.value = fireStoremessages;
    };

    setMessages();

    const addMessage = async (uid: string) => {
      loading.value = true;

      const collectionRef = collection(
        db,
        "chats",
        `${chatID.value}`,
        "messages"
      );

      // Add a new document with a generated id
      const newMessageRef = doc(collectionRef);

      await setDoc(newMessageRef, {
        text: newMessageText.value,
        sender: uid,
        createdAt: Date.now(),
      });
    };

    const newAudioURL = computed(() => {
      if (newAudio.value) {
        return URL.createObjectURL(newAudio.value);
      }
      return "";
    });

    const record = async () => {
      newAudio.value = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const options = { mimeType: "audio/webm" };
      const recordedChunks: any[] = [];
      recorder.value = new MediaRecorder(stream, options);

      recorder.value.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      });

      recorder.value.addEventListener("stop", () => {
        newAudio.value = new Blob(recordedChunks);
        console.log(newAudio);
      });

      recorder.value.start();
    };

    const stop = async () => {
      recorder.value.stop();
      recorder.value = null;
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
    };
  },
});
</script>
