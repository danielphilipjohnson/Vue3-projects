<template>
  <div class="home">
    <h1 class="text-3xl font-bold underline">Home</h1>
    <UserBlock v-slot="{ user }">
      <div v-if="user">
        <UserProfile :user="user" />
        <ChatList :uid="user.uid" />
      </div>

      <TheLogin v-else />
    </UserBlock>
  </div>
</template>

<script lang="ts">
import TheLogin from "../components/TheLogin.vue";
import UserBlock from "../components/UserBlock.vue";
import UserProfile from "../components/UserProfile.vue";
import ChatList from "../components/ChatList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    TheLogin,
    UserBlock,
    UserProfile,
    ChatList,
  },
});
</script>
