<template>
  <div class="">
    <!--<h1 class="text-3xl font-bold underline">Home</h1>-->
    <UserBlock v-slot="{ user }">
      <div v-if="user" class="relative grid grid-cols-6">
        <!--<UserProfile :user="user" />-->
        <!-- TODO split components into files -->
        <ChatList :uid="user.uid" />
        <ChannelContainer />

        <ChannelDetails />
      </div>

      <TheLogin v-else />
    </UserBlock>
  </div>
</template>

<script lang="ts">
import TheLogin from "../components/TheLogin.vue";
import UserBlock from "../components/UserBlock.vue";
import UserProfile from "../components/UserProfile.vue";
import ChannelDetails from "@/components/ChannelDetails.vue";
import ChannelContainer from "@/components/ChatContainer.vue";
import ChatList from "../components/ChatList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    TheLogin,
    UserBlock,
    //UserProfile,
    ChatList,
    ChannelDetails,
    ChannelContainer,
  },
});
</script>
