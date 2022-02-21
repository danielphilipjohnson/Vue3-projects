<template>
  <a
    class="hover:text-blue-600 text-gray-500"
    target="_blank"
    rel="noopener noreferrer"
    :href="link"
    :alt="alt"
  >
    {{ content }}
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

// get generic link
export default defineComponent({
  props: {
    content: {
      type: String as PropType<string>,
      required: true,
    },
    link: {
      type: String as PropType<string>,
      required: true,
    },
    alt: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>
