<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Email } from '../../types/email';
import Button from "../atoms/Button.vue";
export default defineComponent({
  components: {
    Button
  },
  props: {
    emails: { type: Array as PropType<Array<Email>> },
  },
    setup() {

    const handleCreate = () => {
      console.log('Child has been created.............');
    }


    return { handleCreate}
  },
})
</script>

<template>
  <table class="mail-table">
    <tbody>
      <tr v-for="email in emails" :key="email.id">
        
        <td>
          <input type="checkbox" />
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
            @click="handleCreate"
            content="Archive"
            classes="bg-green-500"
          ></Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
