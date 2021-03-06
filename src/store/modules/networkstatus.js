// Pathify
import { make } from 'vuex-pathify'
import * as API from '@/api'

const state = {
  list: {
    online: {
      text: 'API erreichbar',
      icon: 'mdi-cloud-check',
      color: 'green',
      darken: '3'
    },
    offline: {
      text: 'API nicht erreichbar',
      icon: 'mdi-cloud-alert',
      color: 'red',
      darken: '3'
    },
    maintenance: {
      text: 'API im Wartungsmodus',
      icon: 'mdi-cloud-lock',
      color: 'orange',
      darken: '4'
    },
    connecting: {
      text: 'Verbindung wird aufgebaut',
      icon: 'mdi-cloud-search',
      color: 'blue',
      darken: '1'
    }
  },
  current: {
    text: 'Verbindung wird aufgebaut',
    icon: 'mdi-cloud-search',
    color: 'blue',
    darken: '1'
  }
}

const mutations = make.mutations(state)

const actions = {
  load ({ commit }) {
    commit('current', state.list['connecting'])
    API
      .device
      .fetchPart(0, 0)
      .then(response => {
        commit('current', state.list['online'])
      })
      .catch(err => {
        commit('current', state.list['offline'])
        console.log(err.message)
      })
  },
  update ({ commit }, status) {
    if (Object.getOwnPropertyNames(state.list).includes(status)) {
      commit('current', state.list[status])
    }
  }
}

const getters = {
  current: (state, getters) => {
    return state.current
  },
  list: (state, getters) => {
    return state.list
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
