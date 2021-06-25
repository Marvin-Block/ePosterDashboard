<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  /* eslint-disable no-prototype-builtins */
  import '@/styles/overrides.sass'
  import { sync } from 'vuex-pathify'
  import Socket from '@/plugins/socket'
  export default {
    name: 'App',
    metaInfo: {
      title: 'Home',
      titleTemplate: '%s | ePoster Administration',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    data: () => ({
      interval: undefined,
      statusList: [
        {
          text: 'API erreichbar',
          icon: 'mdi-cloud-check',
          color: 'green',
          darken: '3',
        },
        {
          text: 'API nicht erreichbar',
          icon: 'mdi-cloud-alert',
          color: 'red',
          darken: '3',
        },
        {
          text: 'API im Wartungsmodus',
          icon: 'mdi-cloud-lock',
          color: 'orange',
          darken: '4',
        },
        {
          text: 'Verbindung wird aufgebaut',
          icon: 'mdi-cloud-search',
          color: 'blue',
          darken: '1',
        },
      ],
      getVideoError: false,
      getDeviceError: false,
      getLinkError: false,
      getLogError: false,
      client: null,
    }),
    computed: {
      ...sync('app', [
        'videos',
        'devices',
        'logs',
        'links',
        'networkStatus',
      ]),
    },
    beforeDestroy () {
      Socket.$off('message', this.handleMessage)
    },
    created: function () {
      Socket.$on('message', this.handleMessage)
      this.networkStatus = this.statusList[3]
    },
    beforeMount () {
      setInterval(() => {
        Socket.send('device')
        Socket.send('video')
        Socket.send('link')
      }, 60000)
    },
    methods: {
      handleMessage (msg) {
        this.networkStatus = this.statusList[0]
        const content = JSON.parse(msg.data)
        this[content.type + 's'] = content.rows
        this[content.type + 's'] = Object.freeze(this[content.type + 's'].map(entry => { return { ...entry } }))
        // todo: move socket handle to components
      },
    },
  }
</script>
