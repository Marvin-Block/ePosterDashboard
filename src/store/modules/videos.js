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
  replace ({ commit }, item) {
    const data = state.items.map(item => Object.assign({}, item))
    const itemPos = data.map(video => video.id).indexOf(item.id)
    Object.assign(data[itemPos], item)
    commit('items', data)
  },
  update ({ commit }, items) {
    const data = items.map(item => Object.assign({}, item))
    commit('items', data)
  },
  delete ({ commit }, id) {
    const data = state.items.map(item => Object.assign({}, item)).filter(video => video.id !== id)
    commit('items', data)
  },
  insert ({ commit }, newItem) {
    const data = state.items.map(item => Object.assign({}, item))
    data.unshift(newItem)
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