<script lang="ts">
import { defineComponent, ref, computed, PropType } from "vue";
import { useEmailSelection } from "../../composables/useEmailSelection";
import Modal from "./Modal.vue";;

import { Email } from "../../types/email";
import Button from "../atoms/Button.vue";
export default defineComponent({
  components: {
    Button,
    Modal
  },
  props: {
    emails: { type: Array as PropType<Array<Email>> },
  },
  setup() {

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

    }
    
    return { openEmail, openedEmail, emailSelection: useEmailSelection(),  archiveEmail };
  },
});

</script>

<template>
  <table class="mail-table">
    <tbody>
      <tr v-for="email in emails" :key="email.id" @click="openEmail(email)">
        <td>
          <input type="checkbox"  :checked="emailSelection.emails.has(email)"
                 @click="emailSelection.toggle(email)" />
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
          <Button @click="archiveEmail(email)" content="Archive" classes="bg-green-500"></Button>
        </td>
      </tr>
    </tbody>
  </table>

      <Modal v-if="openedEmail" :closeModal="() => { openedEmail = null;  }">


        {{openedEmail}}

      </Modal>
</template>
