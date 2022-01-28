<script lang="ts">
import { defineComponent, ref } from 'vue'
import Button from "../components/atoms/Button.vue";

export default defineComponent({
  components: {
    Button
  },

  setup(){
    const handleCreate = () => {
      console.log('Child has been created.............');
    }
    const selectedScreen = ref("inbox");
    return { handleCreate, selectedScreen}
  },

})

</script>


<template>
  <main>

  <Button @click="handleCreate"
  content="Inbox View"
          :class="[selectedScreen == 'inbox' ? 'selected' : '']">
    
  </Button>
  <Button @click="handleCreate"
  content="Archived View" 
          :class="[selectedScreen == 'archive' ? 'selected' : '']">
    
  </Button>
  </main>
</template>
