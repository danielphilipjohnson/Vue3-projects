<template>
  <div id="app">
    <div class="long-date">{{ new Date() }}</div>
    <h2>welcome</h2>
    <div id="nav" class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
