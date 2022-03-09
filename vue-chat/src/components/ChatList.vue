<template>
  <div
    class="h-full max-h-screen min-h-screen col-span-1 p-6 overflow-y-scroll dark:bg-woodsmoke-400 dark:text-gray-100"
  >
    <SearchBar />

    <UserBar />

    <button
      class="flex items-center mb-3 text-xl uppercase text-bold"
      @click="toggleChannelDisplay()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
      <span> Channels </span>
    </button>
    <transition name="fade">
      <ul class="dark:text-white" v-show="showChannels">
        <li
          v-for="chat of chats"
          :key="chat.id"
          class="p-2 mb-4 rounded hover:bg-gray-400"
        >
          <router-link :to="{ name: 'chat', params: { id: chat.id } }">
            <span class="mr-4"> 🧵 </span>
            <span>
              {{ chat.id }}
            </span>
          </router-link>
        </li>
      </ul>
    </transition>
    <button
      @click="createChatRoom(uid)"
      class="flex p-2 rounded hover:bg-gray-400"
    >
      <span class="p-1 mr-4 bg-gray-500 rounded"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </span>
      <span>Create Chat Room</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { PropType, ref, Ref } from "vue";

import { createChatRoom } from "../firestore-client/index";
import { useGetChatRooms } from "../composables/useGetChatRooms";

import SearchBar from "./SearchBar.vue";
import UserBar from "./UserBar.vue";

export default defineComponent({
  components: {
    SearchBar,
    UserBar,
  },
  name: "ChatList",
  props: {
    uid: { type: String as PropType<string>, required: true },
  },
  setup() {
    const { chats } = useGetChatRooms();

    const showChannels = ref(true);

    const toggleChannelDisplay = () => {
      showChannels.value = !showChannels.value;
    };

    return {
      createChatRoom,
      chats,
      toggleChannelDisplay,
      showChannels,
    };
  },
});
</script>
