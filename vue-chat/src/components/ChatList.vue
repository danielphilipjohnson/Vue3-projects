<template>
  <div>
    <ul>
      <li v-for="chat of chats" :key="chat.id">
        {{ chat.id }}
        <router-link :to="{ name: 'chat', params: { id: chat.id } }">{{
          chat.id
        }}</router-link>
      </li>
    </ul>
    <button @click="createChatRoom()" class="button">
      Create New Chat Room
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { PropType, ref } from "vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default defineComponent({
  name: "ChatList",
  props: {
    uid: { type: String as PropType<string>, required: true },
  },
  setup(uid) {
    let chats = ref();

    // TODO composable
    const setChats = async () => {
      const chatQuery = query(
        collection(db, "chats"),
        where("owner", "==", uid)
      );

      const querySnapshot = await getDocs(chatQuery);
      const firestoreChats: Array<Record<string, any>> = [];

      querySnapshot.forEach((doc) => {
        firestoreChats.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      chats.value = firestoreChats;
    };
    setChats();

    const createChatRoom = async () => {
      const newChat = await db.collection("chats").add({
        createdAt: Date.now(),
        owner: uid,
        members: [uid],
      });

      console.log(newChat);
    };
    return {
      createChatRoom,
      chats,
    };
  },
});
</script>
