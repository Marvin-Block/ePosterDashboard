import { make } from 'vuex-pathify'
import * as API from '@/api'

const state = {
  items: [],
  status: '',
  search: ''
}

const mutations = make.mutations(state)

const actions = {
  load ({ commit }) {
    commit('status', 'loading')
    API
      .playlist
      .fetch()
      .then(data => {
        data = data.data.data.rows
        commit('status', '')
        commit('items', data)
      })
      .catch(err => commit('status', err.message))
  },
  replace ({ commit }, item) {
    const data = state.items.map(item => Object.assign({}, item))
    const itemPos = data.map(playlist => playlist.id).indexOf(item.id)
    Object.assign(data[itemPos], item)
    commit('items', data)
  },
  update ({ commit }, items) {
    const data = items.map(item => Object.assign({}, item))
    commit('items', data)
  },
  delete ({ commit }, uuid) {
    const data = state.items.map(item => Object.assign({}, item)).filter(playlist => playlist.playlistUUID !== uuid)
    commit('items', data)
  },
  insert ({ commit }, newItem) {
    const data = state.items.map(item => Object.assign({}, item))
    data.unshift(newItem)
    commit('items', data)
  }
}

const getters = {
  filter: (state, getters) => {
    return state.items.filter(item => item.name.toLowerCase().startsWith(state.search.toLowerCase()))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
