<template>
  <button @click="auth.signOut()" class="button">Sign Out</button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { auth } from "../../firebase";

export default defineComponent({
  setup() {
    return {
      auth,
    };
  },
});
</script>
