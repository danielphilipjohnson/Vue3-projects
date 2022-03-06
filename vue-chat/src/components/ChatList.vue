<template>
  <div>
    <ul>
      <li v-for="chat of chats" :key="chat.id">
        <router-link :to="{ name: 'chat', params: { id: chat.id } }">{{
          chat.id
        }}</router-link>
      </li>
    </ul>
    <button @click="createChatRoom(uid)" class="button">
      Create New Chat Room
    </button>
  </div>
</template>

<script lang="ts">
import { createChatRoom } from "../firestore-client/index";
import { defineComponent } from "@vue/runtime-core";
import { PropType, ref } from "vue";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default defineComponent({
  name: "ChatList",
  props: {
    uid: { type: String as PropType<string>, required: true },
  },
  setup() {
    const chats: any = ref([]);

    const q = query(collection(db, "chats"));

    onSnapshot(q, (querySnapshot) => {
      chats.value = [];
      querySnapshot.forEach((doc) => {
        chats.value.push({ id: doc.id, ...doc.data() });
      });
    });

    return {
      createChatRoom,
      chats,
    };
  },
});
</script>
