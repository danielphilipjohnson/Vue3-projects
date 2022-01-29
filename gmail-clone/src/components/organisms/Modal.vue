<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  setup() {},
  props: {
    closeModal: { type: Function as PropType<Function>, required: true},
  },
});
</script>

<template>
  <div class="modal">
    <div class="overlay" @click="closeModal"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>
