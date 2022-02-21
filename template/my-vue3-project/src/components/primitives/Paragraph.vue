<template>
  <p class="pb-2 leading-7">
    {{ content }}
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    content: {
      type: String as PropType<string>,
      required: true,
    },
  },
})
</script>