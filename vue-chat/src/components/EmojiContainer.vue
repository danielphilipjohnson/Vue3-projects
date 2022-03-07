<template>
  <template>
    <div v-show="displayEmoji">
      <VuemojiPicker @emojiClick="$emit('handleEmojiClick', $event)" />
    </div>
    <button @click="showEmoji()">:D</button>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { VuemojiPicker } from "vuemoji-picker";

export default defineComponent({
  components: {
    VuemojiPicker,
  },
  setup() {
    const displayEmoji = ref(false);

    const showEmoji = () => {
      displayEmoji.value = !displayEmoji.value;
    };

    return {
      showEmoji,
      displayEmoji,
    };
  },
});
</script>
