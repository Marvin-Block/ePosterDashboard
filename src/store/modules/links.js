import { make } from 'vuex-pathify'
import * as API from '@/api'

const state = {
  items: [],
  status: ''
}

const mutations = make.mutations(state)

const actions = {
  load ({ commit }) {
    commit('status', 'loading')
    API
      .link
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
    const itemPos = data.map(link => link.id).indexOf(item.id)
    Object.assign(data[itemPos], item)
    commit('items', data)
  },
  update ({ commit }, items) {
    const data = items.map(item => Object.assign({}, item))
    commit('items', data)
  },
  deleteBulk ({ commit }, uuidList) {
    const data = state.items.map(item => Object.assign({}, item))
    uuidList.forEach(uuid => {
      const pos = data.map(link => link.linkUUID).indexOf(uuid)
      data.splice(pos, 1)
    })
    commit('items', data)
  },
  delete ({ commit }, uuid) {
    const data = state.items.map(item => Object.assign({}, item)).filter(link => link.linkUUID !== uuid)
    commit('items', data)
  },
  insert ({ commit }, items, itemToAdd) {
    items.unshift(itemToAdd)
    const data = items.map(item => Object.assign({}, item))
    commit('items', data)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
