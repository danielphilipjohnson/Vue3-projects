<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Email } from "../../types/email";

export default defineComponent({

  setup() {

  },
  props: {
    email: { type: Object as PropType<Email>, required: true},

  }
})
</script>

<template>
  <div class="email-display">
    <button @click="alert()">{{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}</button>
    <button @click="alert()">{{ email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}</button>
    <button @click="alert()">Newer (k)</button>
    <button @click="alert()">Older (j)</button>
  </div>

  <h2 class="mb-0">
    Subject:
    <strong>{{ email.subject }}</strong>
  </h2>
  <div>
    <em>From {{ email.from }} on {{ new Date(email.sentAt) }}</em>
  </div>
  <p>{{ email.body }}</p>
</template>



<style scoped>
</style>