<template>
  <div>
    <template v-for="gif in gifs" :key="gif.id">
      <img :src="gif" alt="" @click="$emit('someEvent', $event)" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    gifs: { type: Array as PropType<Array<string>>, required: true },
  },
});
</script>
