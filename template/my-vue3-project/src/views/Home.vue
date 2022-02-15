<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <item-list :items="items" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemList from "@/components/items/ItemList.vue"; // @ is an alias to /src
interface Item {
  id: number
  name: string
}

export default defineComponent({
  name: "Home",
  components: {
    ItemList,
  },
  setup() {
    const items: Item[] = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ];
    return {
      items
    };
  },
});
</script>
