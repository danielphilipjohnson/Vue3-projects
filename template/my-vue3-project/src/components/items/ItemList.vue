<template>
  <div>
    <h3>My Items - loading: {{ loading }}:</h3>
    <Loader v-show="loading" />
    <ul v-show="!loading">
      <ItemComponent
        v-for="item in items"
        :key="item.id"
        :model="item"
        @select="onItemSelected"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Item from "../../models/items/item.interface";
import Loader from "../shared/Loader.vue";

import ItemComponent from "./children/item.vue";

export default defineComponent({
  components: {
    ItemComponent,
    Loader,
  },
  props: {
    items: {
      type: Array as PropType<Item[]>,
      required: true,
    },
    loading: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  emits: ["selectItem"],
  setup(props, { emit }) {
    const onItemSelected = (item: Item) => {
      emit("selectItem", item);
    };

    return {
      onItemSelected,
    };
  },
});
</script>
<style lang="scss">
ul {
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}
</style>
