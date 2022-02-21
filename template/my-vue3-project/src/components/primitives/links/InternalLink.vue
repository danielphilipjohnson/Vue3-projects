<template>
  <nuxt-link :to="link" class="hover:text-blue-600">
    {{ content }}
    <slot></slot>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    link: {
      type: String as PropType<string>,
      required: true,
    },
    content: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>

<style>
.nav-links .nuxt-link-exact-active {
  @apply px-2 py-1;
  background: rgba(55, 53, 47, 0.1);
  border-radius: 5px;
}
</style>
