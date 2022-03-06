<template>
  <button @click="signOut(auth)" class="button">Sign Out</button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { getAuth, signOut } from "firebase/auth";

export default defineComponent({
  setup() {
    const auth = getAuth();
    return {
      auth,
      signOut,
    };
  },
});
</script>
