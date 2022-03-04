<template>
  <div class="home">
    <h1>Home</h1>
    <TheLogin />
  </div>
</template>

<script lang="ts">
import TheLogin from "../components/TheLogin.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    TheLogin,
  },
});
</script>
