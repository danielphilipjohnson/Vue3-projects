<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <item-list :items="items" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemList from "@/components/items/ItemList.vue";
import  {Item}  from "@/models/items/item.interface";


export default defineComponent({
  name: "Home",
  components: {
    ItemList,
  },
  setup() {
    const items: Item[] = [
      { id: 1, name: "Item 1", selected: true },
      { id: 2, name: "Item 2", selected: false },
      { id: 3, name: "Item 3", selected: false },
    ];
    return {
      items
    };
  },
});
</script>
