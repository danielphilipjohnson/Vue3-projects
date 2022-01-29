<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

import Button from "../atoms/Button.vue";

import { useEmailSelection } from "../../composables/useEmailSelection";

import { Email } from "../../types/email";

export default defineComponent({
  components: {
    Button,
  },

  setup(props) {
    let emailSelection = useEmailSelection();

    let numberSelected = computed(() => {
      return emailSelection.emails.size;
    });

    let allAreSelected = computed(() => {
      return (
        props.emails.length == numberSelected.value &&
        numberSelected.value !== 0
      );
    });

    let partialSelection = computed(() => {
      return numberSelected.value > 0 && !allAreSelected.value;
    });

    let bulkSelect = function () {
      if (allAreSelected.value) {
        emailSelection.clear();
      } else {
        emailSelection.addMultiple(props.emails);
      }
    };

    return {
      partialSelection,
      allAreSelected,
      bulkSelect,
      emailSelection,
      numberSelected,
    };
  },

  props: {
    emails: { type: Array as PropType<Array<Email>>, required: true },
    selectedScreen: { type: String as PropType<string>, required: true },
  },
});
</script>

<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :class="[partialSelection ? 'partial-check' : '']"
        @click="bulkSelect"
      />
    </span>

    <span class="buttons">
      <Button
        @click="emailSelection.markRead()"
        content="Mark Read"
        classes="bg-blue-500"
        :disabled="Array.from(emailSelection.emails).every((e) => e.read)"
      ></Button>

      <Button
        @click="emailSelection.markUnread()"
        :disabled="Array.from(emailSelection.emails).every((e) => !e.read)"
        content="Mark Unread"
        classes="bg-blue-500"
      ></Button>
      <Button
        v-if="selectedScreen == 'inbox'"
        @click="emailSelection.archive()"
        :disabled="numberSelected == 0"
        content="Archive"
        classes="bg-blue-500"
      ></Button>
      <Button
        v-else
        @click="emailSelection.moveToInbox()"
        :disabled="numberSelected == 0"
        content="Move to Inbox"
        classes="bg-blue-500"
      ></Button>
    </span>
  </div>
</template>
