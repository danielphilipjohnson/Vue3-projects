<template>
  <div>
    Logged in as {{ user.uid }}
    <br />
    <ButtonSignOut />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import ButtonSignOut from "./firebase/ButtonSignOut.vue";

export default defineComponent({
  components: {
    ButtonSignOut,
  },
  props: {
    user: { type: Object as PropType<Record<string, unknown>>, required: true },
  },
});
</script>
