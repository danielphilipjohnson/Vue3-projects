<script lang="ts">
import { defineComponent } from 'vue'
import Button from "../atoms/Button.vue";

export default defineComponent({
  components: {
    Button
  },

  setup() {
    const handleCreate = () => {
      console.log('Child has been created.............');
    }

    return { handleCreate }
  },

})
</script>


<template>
	<div class="bulk-action-bar">
      <span class="checkbox">
        <input type="checkbox" :class="[partialSelection ? 'partial-check' : '']" />
      </span>

      <span class="buttons">
        <Button
          @click="handleCreate"
          content="Mark Read"
          classes="bg-blue-500"
        ></Button>

        <Button
          @click="handleCreate"
          content="Mark Unread"
          classes="bg-blue-500"
        ></Button>
        <Button
          v-if="selectedScreen == 'inbox'"
          @click="handleCreate"
          content="Archive"
          classes="bg-blue-500"
        ></Button>
        <Button
          v-else
          @click="handleCreate"
          content="Move to Inbox"

          classes="bg-blue-500"
        ></Button>
      </span>
    </div>
</template>