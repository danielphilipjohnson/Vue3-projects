
import { createStore } from 'vuex'
import Item from '@/models/items/item.interface'
import { ItemsStateInterface } from '@/models/store/ItemsState.interface'
import apiClient from '@/api-client'


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
    },
    selectItem(state: ItemsStateInterface, params: {
      id: number,
      selected: boolean
    }) {
      const { id, selected } = params
      const item = state.items.find(o => o.id === id)
      if (item) {
        item.selected = selected
      }
    }
  },
  actions: {
    loadItems({ commit, state }) {
      commit('loadingItems');


      // let's pretend we called some API end-point 
      // and it takes 1 second to return the data
      // by using javascript setTimeout with 1000 for the milliseconds option
      setTimeout(() => {
        apiClient
          .items
          .fetchItems().then((data: Item[]) => {
            commit('loadedItems', data)
          })
      }, 1000);
    },
    selectItem({ commit }, params: {
      id: number
      selected: boolean
    }) {
      commit('selectItem', params)
    }
  },
  modules: {
  }
})