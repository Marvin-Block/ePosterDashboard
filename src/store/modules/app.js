// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: false,
  networkStatus: {
    text: 'Verbindung wird aufgebaut',
    icon: 'mdi-cloud-search',
    color: 'blue',
    darken: '1',
  },
  mini: true,
  videos: [],
  devices: [],
  links: [],
  logs: [],
  playlists: [
    {
      playlistUUID: 'fc24ed1b-1396-42e6-b527-80d17af33bdc',
      name: 'Test Playlist 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet neque id nulla rutrum, at posuere erat venenatis. Suspendisse potenti. Duis nisl arcu, dapibus id sodales et, porttitor non mauris. Integer ultricies ante nunc, id malesuada odio lobortis porta. Pellentesque quis euismod nulla, et consectetur enim. Phasellus lectus velit, interdum tempor vestibulum imperdiet, ornare sed urna. Quisque ac purus mattis, consectetur lectus et, interdum lacus. Maecenas eu turpis tortor. Aenean sed ante nisl. Cras est quam, imperdiet ac rutrum sed, feugiat eu dui. Donec rutrum libero tortor, sed tempus tellus elementum vel. Fusce ullamcorper turpis id tristique consectetur. Nulla tempus nec dolor eu iaculis.',
      playlistLinks: [
        {
          videoUUID: 'e3d08d01-3c4b-409f-99a1-d646425957f0',
          name: 'Hans1', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
        {
          videoUUID: '0bae58ab-e303-435e-8719-af22b9b5cff5',
          name: 'Hans2', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
        {
          videoUUID: 'aeda186d-8b6b-41fc-9f65-df4156ca2bc1',
          name: 'Hans3', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
      ],
    },
    {
      playlistUUID: '9cd94ca1-1ec8-496c-8f71-0f3901a5589d',
      name: 'Test Playlist 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet neque id nulla rutrum, at posuere erat venenatis. Suspendisse potenti. Duis nisl arcu, dapibus id sodales et, porttitor non mauris. Integer ultricies ante nunc, id malesuada odio lobortis porta. Pellentesque quis euismod nulla, et consectetur enim. Phasellus lectus velit, interdum tempor vestibulum imperdiet, ornare sed urna. Quisque ac purus mattis, consectetur lectus et, interdum lacus. Maecenas eu turpis tortor. Aenean sed ante nisl. Cras est quam, imperdiet ac rutrum sed, feugiat eu dui. Donec rutrum libero tortor, sed tempus tellus elementum vel. Fusce ullamcorper turpis id tristique consectetur. Nulla tempus nec dolor eu iaculis.',
      playlistLinks: [
        {
          videoUUID: 'e3d08d01-3c4b-409f-99a1-d646425957f0',
          name: 'Hans1', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
        {
          videoUUID: '0bae58ab-e303-435e-8719-af22b9b5cff5',
          name: 'Hans2', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
        {
          videoUUID: 'aeda186d-8b6b-41fc-9f65-df4156ca2bc1',
          name: 'Hans3', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
      ],
    },
    {
      playlistUUID: '02cbcdbc-ecf2-4ff6-ab44-30b57aa33073',
      name: 'Test Playlist 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet neque id nulla rutrum, at posuere erat venenatis. Suspendisse potenti. Duis nisl arcu, dapibus id sodales et, porttitor non mauris. Integer ultricies ante nunc, id malesuada odio lobortis porta. Pellentesque quis euismod nulla, et consectetur enim. Phasellus lectus velit, interdum tempor vestibulum imperdiet, ornare sed urna. Quisque ac purus mattis, consectetur lectus et, interdum lacus. Maecenas eu turpis tortor. Aenean sed ante nisl. Cras est quam, imperdiet ac rutrum sed, feugiat eu dui. Donec rutrum libero tortor, sed tempus tellus elementum vel. Fusce ullamcorper turpis id tristique consectetur. Nulla tempus nec dolor eu iaculis.',
      playlistLinks: [
        {
          videoUUID: 'e3d08d01-3c4b-409f-99a1-d646425957f0',
          name: 'Hans1', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
        {
          videoUUID: '0bae58ab-e303-435e-8719-af22b9b5cff5',
          name: 'Hans2', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
        {
          videoUUID: 'aeda186d-8b6b-41fc-9f65-df4156ca2bc1',
          name: 'Hans3', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
      ],
    },
    {
      playlistUUID: '02cbcdbc-ecf2-4ff6-ab44-30b57aa33073',
      name: 'Test Playlist 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet neque id nulla rutrum, at posuere erat venenatis. Suspendisse potenti. Duis nisl arcu, dapibus id sodales et, porttitor non mauris. Integer ultricies ante nunc, id malesuada odio lobortis porta. Pellentesque quis euismod nulla, et consectetur enim. Phasellus lectus velit, interdum tempor vestibulum imperdiet, ornare sed urna. Quisque ac purus mattis, consectetur lectus et, interdum lacus. Maecenas eu turpis tortor. Aenean sed ante nisl. Cras est quam, imperdiet ac rutrum sed, feugiat eu dui. Donec rutrum libero tortor, sed tempus tellus elementum vel. Fusce ullamcorper turpis id tristique consectetur. Nulla tempus nec dolor eu iaculis.',
      playlistLinks: [
        {
          videoUUID: 'e3d08d01-3c4b-409f-99a1-d646425957f0',
          name: 'Hans1', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
        {
          videoUUID: '0bae58ab-e303-435e-8719-af22b9b5cff5',
          name: 'Hans2', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
        {
          videoUUID: 'aeda186d-8b6b-41fc-9f65-df4156ca2bc1',
          name: 'Hans3', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
        {
          videoUUID: '84a5b512-d085-4194-8c6e-96696cfc206e',
          name: 'Hans4', // for dev purpose
          start: '1622498400000',
          end: '1640991540000',
          active: 1,
          position: 999,
        },
      ],
    },
  ],
  items: [
    {
      title: 'Dashboard',
      // icon: 'mdi-view-dashboard',
      icon: 'mdi-chart-box-outline',
      to: '/',
    },
    {
      title: 'Geräte',
      icon: 'mdi-monitor-cellphone-star',
      to: '/devices/',
    },
    {
      title: 'Videos',
      icon: 'mdi-widgets',
      to: '/videos/',
    },
    {
      title: 'Links',
      icon: 'mdi-auto-fix',
      to: '/links/',
    },
    // {
    //   title: 'Logs',
    //   icon: 'mdi-history',
    //   to: '/logs/',
    // },
    {
      title: 'Playlist',
      icon: 'mdi-folder',
      to: '/playlist/',
    },
    // {
    //   title: 'Pages',
    //   icon: 'mdi-image',
    //   items: [
    //     {
    //       title: 'Pricing',
    //       to: '/pages/pricing/',
    //     },
    //     {
    //       title: 'RTL Support',
    //       to: '/pages/rtl/',
    //     },
    //     {
    //       title: 'Timeline',
    //       to: '/components/timeline/',
    //     },
    //     {
    //       title: 'Login Page',
    //       to: '/pages/login/',
    //     },
    //     {
    //       title: 'Register Page',
    //       to: '/pages/register/',
    //     },
    //     {
    //       title: 'Lock Screen Page',
    //       to: '/pages/lock/',
    //     },
    //     {
    //       title: 'User Profile',
    //       to: '/components/profile/',
    //     },
    //     {
    //       title: 'Error Page',
    //       to: '/pages/error/',
    //     },
    //   ],
    // },
    // {
    //   title: 'Components',
    //   icon: 'mdi-view-comfy',
    //   items: [
    //     {
    //       title: 'Multi Level Collapse',
    //       items: [{
    //         title: 'Example',
    //       }],
    //     },
    //     {
    //       title: 'Buttons',
    //       to: '/components/buttons/',
    //     },
    //     {
    //       title: 'Grid System',
    //       to: '/components/grid/',
    //     },
    //     {
    //       title: 'Tabs',
    //       to: '/components/tabs/',
    //     },
    //     {
    //       title: 'Notifications',
    //       to: '/components/notifications/',
    //     },
    //     {
    //       title: 'Icons',
    //       to: '/components/icons/',
    //     },
    //     {
    //       title: 'Typography',
    //       to: '/components/typography/',
    //     },
    //   ],
    // },
    // {
    //   title: 'Forms',
    //   icon: 'mdi-clipboard-outline',
    //   items: [
    //     {
    //       title: 'Regular Forms',
    //       to: '/forms/regular/',
    //     },
    //     {
    //       title: 'Extended Forms',
    //       to: '/forms/extended/',
    //     },
    //     {
    //       title: 'Validation Forms',
    //       to: '/forms/validation/',
    //     },
    //     {
    //       title: 'Wizard',
    //       to: '/forms/wizard/',
    //     },
    //   ],
    // },
    // {
    //   title: 'Tables',
    //   icon: 'mdi-grid',
    //   items: [
    //     {
    //       title: 'Regular Tables',
    //       to: '/tables/regular/',
    //     },
    //     {
    //       title: 'Extended Tables',
    //       to: '/tables/extended/',
    //     },
    //     {
    //       title: 'DataTables Tables',
    //       to: '/tables/data-tables/',
    //     },
    //   ],
    // },
    // {
    //   title: 'Maps',
    //   icon: 'mdi-map-marker',
    //   items: [
    //     {
    //       title: 'Google Maps',
    //       to: '/maps/google/',
    //     },
    //     {
    //       title: 'Fullscreen Map',
    //       to: '/maps/fullscreen/',
    //     },
    //   ],
    // },
    // {
    //   title: 'Widgets',
    //   icon: 'mdi-widgets',
    //   to: '/widgets/',
    // },
    // {
    //   title: 'Charts',
    //   icon: 'mdi-chart-timeline-variant',
    //   to: '/charts/',
    // },
    // {
    //   title: 'Calendar',
    //   icon: 'mdi-calendar-range-outline',
    //   to: '/calendar/',
    // },
  ],
}

const mutations = {
  ...make.mutations(state),
  UPDATE_PLAYLISTS: (state, payload) => {
    console.log(state.playlists, payload)
    state.playlists = state.playlists.map(foreignObj => {
      payload.forEach(nativeObj => {
        if (foreignObj.playlistUUID === nativeObj.playlistUUID) {
          return Object.assign({}, nativeObj, foreignObj)
        }
        return nativeObj
      })
      // if (playlist.playlistUUID === payload.playlistUUID) {
      //   return Object.assign({}, playlist, payload.playlists)
      // }
      // return playlist
    })
  },
  UPDATE_LINKS: (state, payload) => {
    state.links = state.links.map(link => {
      if (link.ID === payload.ID) {
        return Object.assign({}, link, payload.playlists)
      }
      return link
    })
  },
  UPDATE_DEVICES: (state, payload) => {
    state.playlists = state.playlists.map(playlist => {
      if (playlist.playlistUUID === payload.playlistUUID) {
        return Object.assign({}, playlist, payload.playlists)
      }
      return playlist
    })
  },
  UPDATE_VIDEOS: (state, payload) => {
    state.playlists = state.playlists.map(playlist => {
      if (playlist.playlistUUID === payload.playlistUUID) {
        return Object.assign({}, playlist, payload.playlists)
      }
      return playlist
    })
  },
}

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
  updatePlaylists: ({ commit }, payload) => commit('UPDATE_PLAYLISTS', payload),
  updateLinks: ({ commit }, payload) => commit('UPDATE_LINKS', payload),
  updateDevices: ({ commit }, payload) => commit('UPDATE_DEVICES', payload),
  updateVideos: ({ commit }, payload) => commit('UPDATE_VIDEOS', payload),
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
