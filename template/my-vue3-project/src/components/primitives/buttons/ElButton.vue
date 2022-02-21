<template>
  <NuxtLink
    v-if="type === 'primary'"
    class="border border-white text-white mr-4 py-2 px-3 bg-primary text-sm font-bold hover:opacity-75"
    :to="link"
    :disabled="disabled"
    @click="onClick"
  >
    {{ label }}
  </NuxtLink>
  <NuxtLink
    v-else-if="type === 'secondary'"
    class="border border-white text-white py-2 px-4 bg-primary-dark text-sm font-bold hover:opacity-75"
    :to="link"
    :disabled="disabled"
    @click="onClick"
  >
    {{ label }}
  </NuxtLink>

  <NuxtLink
    v-else
    class="border border-white text-white py-2 px-4 text-sm font-bold hover:opacity-75"
    :to="link"
    :disabled="disabled"
    @click="onClick"
  >
    {{ label }}
  </NuxtLink>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ElButton",
  props: {
    link: {
      type: Object as PropType<Record<string, unknown>>,
      required: true,
    },
    text: {
      type: String as PropType<string>,
      required: true,
    },
    type: {
      type: String as PropType<string>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    label: {
      type: String as PropType<string>,
      default: "Default Button",
    },
    addCss: {
      type: String as PropType<string>,
      default: "",
    },
  },
  emits: ["clicked"],
  methods: {
    onClick() {
      // proceed only if the button is not disabled, otherwise ignore the click
      if (!this.disabled) {
        this.$emit("clicked");
      }
    },
  },
  computed: {
    cssClass(): string {
      let classes = [""];

      if (this.disabled) {
        // these are the button CSS classes when disabled
        classes.push("bg-gray-500 text-gray-300 opacity-50 cursor-not-allowed");
      } else {
        // these are the button CSS classes when enabled
        classes.push("bg-blue-500 text-white hover:bg-blue-400");
      }

      // addCss will have additional CSS class
      // we want to apply from where we consume this component
      return classes.join(" ");
    },
  },
});
</script>
