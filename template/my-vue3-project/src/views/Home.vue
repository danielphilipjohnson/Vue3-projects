<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    {{loading}}
    <item-list :items="items" :loading="loading" @selectItem="onSelectItem"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import ItemList from "@/components/items/ItemList.vue";
import Item from "@/models/items/item.interface";
import store from "@/store";

export default defineComponent({
  name: "Home",
  components: {
    ItemList,
  },
  setup() {
    onMounted(() => {
      store.dispatch("loadItems");
    });
    const items = computed(() => {
      return store.state.items;
    });
    const loading = computed(() => {
      return store.state.loading;
    });

    const onSelectItem = (item: Item) => {
        store.dispatch('selectItem', {
          id: item.id,
          selected: !item.selected
        })
      }

    return {
      items,
      loading,
      onSelectItem
    };
  },
});
</script>
