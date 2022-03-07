<template>
  <h5>Record Audio</h5>

  <button
    v-if="!recorder"
    @click="$emit('audio-record')"
    class="button is-info"
  >
    Record Voice
  </button>

  <button v-else @click="$emit('audio-stop')" class="button is-danger">
    Stop
  </button>

  <br />

  <audio v-if="newAudio" :src="newAudioURL" controls></audio>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["audio-stop", "audio-record"],
  props: {
    recorder: {
      type: [MediaRecorder, null] as PropType<MediaRecorder | null>,
      required: true,
    },
    newAudioURL: { type: String as PropType<string>, required: true },
    newAudio: { type: [Blob, null] as PropType<Blob | null>, required: true },
  },
});
</script>
