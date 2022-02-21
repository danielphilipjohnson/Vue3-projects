<template>
  <div id="app">
    <TheNav />
    <div class="long-date">{{ new Date() }}</div>
    <h2>welcome</h2>
    <div id="nav" class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
    </div>
    <router-view />
    <TheFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheNav from "./TheNav.vue";
import TheFooter  from "./TheFooter.vue";
export default defineComponent({
  name: "App",
  components: {
    TheFooter,
    TheNav
  },
});
</script>
