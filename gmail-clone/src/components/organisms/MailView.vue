<script lang="ts">
import { defineComponent, PropType } from "vue";
import Button from "../atoms/Button.vue";
import { Email } from "../../types/email";

export default defineComponent({
  components: {
    Button
  },

  setup() {

  },
  props: {
    email: { type: Object as PropType<Email>, required: true },

  }
})
</script>

<template>
  <div class="email-display">
    <Button
      @click="alert()"
      classes="bg-red-500"
    >{{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}</Button>

    <Button
      @click="alert()"
      classes="bg-red-500"
    >{{ email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}</Button>

    <Button @click="alert()" content="Newer (k)" classes="bg-red-500"></Button>
    <Button @click="alert()" content="Older (j)" classes="bg-red-500"></Button>
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

