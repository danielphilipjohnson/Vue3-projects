<template>
  <slot :user="user"></slot>
</template>

<script lang="ts">
import { getAuth } from "firebase/auth";

import { defineComponent, ref, onUnmounted, Ref } from "vue";

export default defineComponent({
  setup() {
    const user: Ref = ref(null);
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(
      (firebaseUser) => (user.value = firebaseUser)
    );

    onUnmounted(() => unsubscribe());

    return {
      user,
    };
  },
});
</script>
