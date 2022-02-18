import { createStore } from 'vuex'
import Item from '@/models/items/item.interface'
import { ItemsStateInterface } from '@/models/store/ItemsState.interface'

// our initial state:
const state: ItemsStateInterface = {
  loading: false,
  items: []
}

export default createStore({
  state: state,
  mutations: {
    loadingItems(state: ItemsStateInterface) {
      state.loading = true
      state.items = []
    },
    loadedItems(state: ItemsStateInterface, items: Item[]) {
      state.items = items
      state.loading = false
    }
  },
  actions: {
    loadItems({ commit, state }) {
      commit('loadingItems');

      // mock some data
      const mockItems: Item[] = [{
        id: 1,
        name: 'Item 1',
        selected: false
      }, {
        id: 2,
        name: 'Item 2',
        selected: false
      }, {
        id: 3,
        name: 'Item 3',
        selected: false
      }];

      // let's pretend we called some API end-point 
      // and it takes 1 second to return the data
      // by using javascript setTimeout with 1000 for the milliseconds option
      setTimeout(() => {
        commit('loadedItems', mockItems)
      }, 1000);
    },

  },
  modules: {
  }
})