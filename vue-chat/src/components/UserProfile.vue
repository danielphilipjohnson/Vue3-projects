<template>
  <div>
    Logged in as {{ user.uid }}
    <br />
    <button @click="auth.signOut()" class="button">Sign Out</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { auth } from "../firebase";

export default defineComponent({
  setup() {
    return {
      auth,
    };
  },
  props: {
    user: { type: Object as PropType<Record<string, unknown>>, required: true },
  },
});
</script>
