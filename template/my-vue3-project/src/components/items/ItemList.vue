<template>
  <div>
    <h3>Items:</h3>
    <ul>
      <li v-for="item in items" :key="item.id" @click="onItemSelected(item)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Item } from "@/models/items/item.interface";

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<Item[]>,
      required: true,
    },
  },
  setup() {
    const onItemSelected = (item: Item) => {
      item.selected = !item.selected;
    };

    return {
      onItemSelected,
    };
  },
});
</script>
