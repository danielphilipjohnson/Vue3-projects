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
import { VuemojiPicker, EmojiClickEventDetail } from "vuemoji-picker";

import {
  getDownloadURL,
  getStorage,
  ref as firestoreRef,
  uploadBytesResumable,
} from "firebase/storage";

import {
  collection,
  doc,
  query,
  orderBy,
  limitToLast,
  setDoc,
  onSnapshot,
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
    VuemojiPicker,
  },
  setup() {
    const route = useRoute();
    const chatID = computed(() => {
      return route.params.id;
    });

    const newMessageText = ref("");
    const loading = ref(false);
    const messages: Ref = ref([]);

    const newAudio: Ref<Blob | null> = ref(null);
    const recorder: Ref = ref(null);
    const audioURL: Ref = ref(null);

    const chatQuery = query(
      collection(db, "chats", `${chatID.value}`, "messages"),
      orderBy("createdAt"),
      limitToLast(10)
    );

    onSnapshot(chatQuery, (querySnapshot) => {
      messages.value = [];
      querySnapshot.forEach((doc) => {
        messages.value.push({ id: doc.id, ...doc.data() });
      });
    });

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
      if (newAudio.value) {
        if (!Array.isArray(chatID.value)) {
          //const imagesRef = firestoreRef(storage, "chats/", "chatID.value" );
          //const childImagesRef = firestoreRef(storage, "chats/" + chatID.value);
          const ext = firestoreRef(
            storage,
            "chats/" + chatID.value + "/" + newMessageRef.id + ".wav"
          );

          const uploadTask = uploadBytesResumable(ext, newAudio.value);

          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on(
            "state_changed",
            (snapshot: any) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error: any) => {
              console.log(error);
              // Handle unsuccessful uploads
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  console.log("File available at", downloadURL);
                  // TODO set for audio then set without
                  await setDoc(newMessageRef, {
                    text: newMessageText.value,
                    sender: uid,
                    createdAt: Date.now(),
                    audioURL: downloadURL,
                  });
                }
              );
            }
          );

          // TODO SET generic AUDIO
          //const url = await getDownloadURL(ext);
        }
      }

      console.log(audioURL.value);
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

      recorder.value.addEventListener(
        "dataavailable",
        (e: { data: { size: number } }) => {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        }
      );

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

    const handleEmojiClick = (detail: EmojiClickEventDetail) => {
      console.log(detail);
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
