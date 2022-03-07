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
import { defineComponent } from "@vue/runtime-core";
import { PropType } from "vue";

import { createChatRoom } from "../firestore-client/index";
import { useGetChatRooms } from "../composables/useGetChatRooms";

export default defineComponent({
  name: "ChatList",
  props: {
    uid: { type: String as PropType<string>, required: true },
  },
  setup() {
    const { chats } = useGetChatRooms();

    return {
      createChatRoom,
      chats,
    };
  },
});
</script>
