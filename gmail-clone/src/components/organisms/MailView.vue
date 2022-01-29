<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import Button from "../atoms/Button.vue";
import { Email } from "../../types/email";
import { useKeydown } from "../../composables/useKeydown";
import { format } from "date-fns";

export default defineComponent({
  components: {
    Button,
  },

  setup({ email, changeEmail }) {
    let toggleArchive = () =>
      changeEmail({ toggleArchive: true, save: true, closeModal: true });
    let toggleRead = () => changeEmail({ toggleRead: true, save: true });
    let goNewer = () => changeEmail({ indexChange: -1 });
    let goOlder = () => changeEmail({ indexChange: 1 });
    let goNewerAndArchive = () =>
      changeEmail({ indexChange: -1, toggleArchive: true });
    let goOlderAndArchive = () =>
      changeEmail({ indexChange: 1, toggleArchive: true });

    useKeydown([
      { key: "e", fn: toggleArchive },
      { key: "r", fn: toggleRead },
      { key: "k", fn: goNewer },
      { key: "j", fn: goOlder },
      { key: "[", fn: goNewerAndArchive },
      { key: "]", fn: goOlderAndArchive },
    ]);

    const formattedDate = computed(() => {
      return format(new Date(email.sentAt), "MMM do yyyy");
    });

    return {
      goOlder,
      goNewer,
      toggleRead,
      toggleArchive,
      formattedDate,
    };
  },
  props: {
    email: { type: Object as PropType<Email>, required: true },
    changeEmail: { type: Function as PropType<Function>, required: true },
  },
});
</script>

<template>
  <div class="email-display">
    <Button @click="toggleArchive" classes="bg-red-500">{{
      email.archived ? "Move to Inbox (e)" : "Archive (e)"
    }}</Button>

    <Button @click="toggleRead" classes="bg-red-500">{{
      email.read ? "Mark Unread (r)" : "Mark Read (r)"
    }}</Button>

    <Button @click="goNewer" content="Newer (k)" classes="bg-red-500"></Button>
    <Button @click="goOlder" content="Older (j)" classes="bg-red-500"></Button>
  </div>

  <h2 class="mb-0">
    Subject:
    <strong>{{ email.subject }}</strong>
  </h2>
  <div>
    <em>From {{ email.from }} on {{ formattedDate }}</em>
  </div>
  <p>{{ email.body }}</p>
</template>
