// Pathify
import { make } from 'vuex-pathify'
import * as API from '@/api'
import moment from 'moment'

const state = {
  items: [],
  status: ''
}

const mutations = make.mutations(state)

const actions = {
  load ({ commit }) {
    commit('status', 'loading')
    API
      .video
      .fetch()
      .then(data => {
        data = data.data.data.rows
        commit('status', '')
        commit('items', data)
      })
      .catch(err => commit('status', err.message))
  },
  update ({ commit }, items) {
    const data = items.map(item => Object.assign({}, item))
    commit('items', data)
  },
  delete ({ commit }, items, index) {
    items.splice(index, 1)
    const data = items.map(item => Object.assign({}, item))
    commit('items', data)
  },
  insert ({ commit }, items, itemToAdd) {
    items.unshift(itemToAdd)
    const data = items.map(item => Object.assign({}, item))
    commit('items', data)
  }
}

const getters = {
  topFive: (state, getters) => {
    return { items: state.items.slice(0, 5), status: state.status }
  },
  videosToday: (state, getters) => {
    return state.items.filter(item => moment().diff(item.createdAt, 'days') === 0).length
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
