<template>
  <component :is="tag" :class="classes[tag]">
    {{ content }}
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    tag: {
      type: String as PropType<string>,
      required: true,
      validator: (value) =>
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(value.toLowerCase()),
    },
    content: {
      type: String as PropType<string>,
      required: true,
    },
  },
  data() {
    return {
      classes: {
        h1: "text-3xl md:text-4xl font-bold pb-2 mb-3 border-b border-grey",
        h2: "text-3xl md:text-4xl mr-8 uppercase text-sm font-bold text-light-gray mb-2",
        h3: "text-2xl md:text-3xl mr-8 uppercase text-sm font-bold text-light-gray mb-2",
        h4: "text-xl md:text-2xl mr-8 uppercase text-sm font-bold text-light-gray mb-2",
        h5: "mr-8 uppercase text-sm font-bold text-light-gray mb-2",
        h6: "mr-8 uppercase text-sm font-bold text-light-gray mb-2",
      },
    };
  },
});
</script>
