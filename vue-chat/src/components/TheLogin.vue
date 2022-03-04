<template>
  <aside>
    <h3>Sign in Anonymously</h3>
    <button type="button" @click="auth.signInAnonymously()">Sign In</button>
  </aside>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { auth } from "../firebase";
export default defineComponent({
  setup() {
    return {
      auth,
    };
  },
});
</script>
