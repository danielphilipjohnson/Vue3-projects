<script lang="ts">
import { defineComponent, ref, computed, PropType } from "vue";
import { useEmailSelection } from "../../composables/useEmailSelection";
import Modal from "./Modal.vue";
import MailView from "./MailView.vue";

import { Email } from "../../types/email";
import Button from "../atoms/Button.vue";

export default defineComponent({
  components: {
    Button,
    Modal,
    MailView,
  },
  props: {
    emails: { type: Array as PropType<Array<Email>>, required: true},
  },
  setup({emails}) {
    const openedEmail = ref();

    // Sets open email
    const openEmail = (email: Email) => {
      openedEmail.value = email;

      if (email) {
        email.read = true;
      }
    };

    const archiveEmail = (email: Email) => {
      email.archived = true;
    };

    const changeEmail = (
      email: Email,
      {
        indexChange,
        toggleArchive,
        toggleRead,
        save,
        closeModal,
      }: { indexChange: number; toggleArchive: Boolean, toggleRead: Boolean, save: Boolean, closeModal: Boolean}
    ) => {
      if (toggleArchive) {
        email.archived = !email.archived;
      }
      if (toggleRead) {
        email.read = !email.read;
      }
      if(save) { console.log("save later") }
      if (closeModal) {
        openedEmail.value = null;
        return null;
      }

      if (indexChange) {
        let index = emails.findIndex((e) => e == email);
        openEmail(emails[index + indexChange]);
      }
    };

    return {
      openEmail,
      openedEmail,
      emailSelection: useEmailSelection(),
      archiveEmail,
      changeEmail
    };
  },
});
</script>

<template>
  <table class="mail-table">
    <tbody>
      <tr v-for="email in emails" :key="email.id" @click="openEmail(email)">
        <td>
          <input
            type="checkbox"
            :checked="emailSelection.emails.has(email)"
            @click="emailSelection.toggle(email)"
          />
        </td>
        <td>{{ email.from }}</td>
        <td>
          <p>
            <strong>{{ email.subject }}</strong>
            - {{ email.body }}
          </p>
        </td>
        <td class="date">{{ new Date(email.sentAt) }}</td>
        <td>
          <Button
            @click="archiveEmail(email)"
            content="Archive"
            classes="bg-green-500"
          ></Button>
        </td>
      </tr>
    </tbody>
  </table>

  <Modal
    v-if="openedEmail"
    :closeModal="
      () => {
        openedEmail = null;
      }
    "
  >
    <MailView :email="openedEmail" :changeEmail="(args) => changeEmail(openedEmail, args)" />
  </Modal>
</template>
