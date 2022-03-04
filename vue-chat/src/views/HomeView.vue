<template>
  <div class="home">
    <h1>Home</h1>
    <UserBlock v-slot="{ user }">
      <UserProfile v-if="user" :user="user" />
      <TheLogin v-else />
    </UserBlock>
  </div>
</template>

<script lang="ts">
import TheLogin from "../components/TheLogin.vue";
import UserBlock from "../components/UserBlock.vue";
import UserProfile from "../components/UserProfile.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    TheLogin,
    UserBlock,
    UserProfile,
  },
});
</script>
