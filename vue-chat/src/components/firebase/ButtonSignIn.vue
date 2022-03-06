<template>
  <button
    class="button is-info"
    :class="{ 'is-loading': loading }"
    @click.prevent="$emit('buttonClick')"
  >
    {{ isNewUser ? "Sign Up" : "Login" }}
  </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    loading: { type: Boolean as PropType<boolean>, required: true },
    isNewUser: { type: Boolean as PropType<boolean>, required: true },
  },
});
</script>
