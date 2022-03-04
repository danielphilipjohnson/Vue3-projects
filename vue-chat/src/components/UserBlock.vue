<template>
  <div>
    <slot :user="user"></slot>
  </div>
</template>

<script lang="ts">
import { auth } from "../firebase";

import { defineComponent, ref, onUnmounted } from "vue";

export default defineComponent({
  setup() {
    const user: any = ref(null);

    const unsubscribe: any | null = auth.onAuthStateChanged(
      (firebaseUser) => (user.value = firebaseUser)
    );

    onUnmounted(() => clearInterval(unsubscribe()));

    return {
      user,
    };
  },
});
</script>
