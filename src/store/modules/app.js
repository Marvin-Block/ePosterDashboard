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
    {
      title: 'Logs',
      icon: 'mdi-history',
      to: '/logs/',
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
    {
      title: 'Components',
      icon: 'mdi-view-comfy',
      items: [
        {
          title: 'Multi Level Collapse',
          items: [{
            title: 'Example',
          }],
        },
        {
          title: 'Buttons',
          to: '/components/buttons/',
        },
        {
          title: 'Grid System',
          to: '/components/grid/',
        },
        {
          title: 'Tabs',
          to: '/components/tabs/',
        },
        {
          title: 'Notifications',
          to: '/components/notifications/',
        },
        {
          title: 'Icons',
          to: '/components/icons/',
        },
        {
          title: 'Typography',
          to: '/components/typography/',
        },
      ],
    },
    {
      title: 'Forms',
      icon: 'mdi-clipboard-outline',
      items: [
        {
          title: 'Regular Forms',
          to: '/forms/regular/',
        },
        {
          title: 'Extended Forms',
          to: '/forms/extended/',
        },
        {
          title: 'Validation Forms',
          to: '/forms/validation/',
        },
        {
          title: 'Wizard',
          to: '/forms/wizard/',
        },
      ],
    },
    {
      title: 'Tables',
      icon: 'mdi-grid',
      items: [
        {
          title: 'Regular Tables',
          to: '/tables/regular/',
        },
        {
          title: 'Extended Tables',
          to: '/tables/extended/',
        },
        {
          title: 'DataTables Tables',
          to: '/tables/data-tables/',
        },
      ],
    },
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

const mutations = make.mutations(state)

// noinspection JSUnusedLocalSymbols
const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
