<template>
  <aside>
    <h3>Sign in Anonymously</h3>
    <button type="button" @click="auth.signInAnonymously()">Sign In</button>
  </aside>
</template>
<script lang="ts">
import { auth } from "../firebase";

export default {
  name: "TheLogin",
  setup() {
    return {
      auth,
    };
  },
};
</script>
