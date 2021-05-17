<template>
  <v-container
    id="dashboard-view"
    fluid
    tag="section"
  >
    <v-row>

<!--      stat cards below-->
      <v-col
        v-for="(stat, i) in stats"
        :key="i"
        cols="12"
        md="6"
        lg="3"
      >
        <v-card
          class="v-card--material mt-4"
        >
          <v-card-title class="align-start">
            <v-sheet
              :color="stat.color"
              class="overflow-hidden mt-n9 transition-swing v-card--material__sheet"
              elevation="6"
              max-width="100%"
              rounded
            >
              <v-theme-provider
                dark
              >
                <div
                  class="pa-7"
                >
                  <v-icon
                    large
                    v-text="stat.icon"
                  />
                </div>

                <div
                  class="text-h4 white--text pa-7 v-card--material__title"
                >
                  header
                </div>
              </v-theme-provider>
            </v-sheet>

            <div
              class="text-h4 pl-4 v-card--material__title"
            >
              <template>
                {{ stat.title }}
              </template>

              <div class="text-subtitle-1 mb-n2">
                <template>
                  <div
                    class="text-right text-h3 v-card__subtitle--material-stats"
                    v-text="stat.value"
                  />
                </template>
              </div>
            </div>
          </v-card-title>
          <template>
            <v-divider class="mt-2 mx-4" />

            <v-card-actions class="px-4 text-caption grey--text">
              <v-icon
                class="mr-2"
                small
                v-text="stat.actionIcon"
              />
              <div
                class="text-truncate"
                v-text="stat.actionText"
              >
              </div>
            </v-card-actions>
          </template>
        </v-card>
      </v-col>

<!--      Spacer-->
      <v-col cols="12" />

<!--      new videos-->
      <v-col
        cols="12"
        md="6"
      >
        <material-card
          icon="mdi-widgets"
          icon-small
          color="accent"
          title="Die neuesten Videos"
        >
          <v-card-text>
            <v-data-table
              :headers="videoHeaders"
              :items="this.videos.slice(0,5)"
              no-data-text="Es scheint keine neuen Videos zu geben"
              loading-text="Videos werden geladen..."
              :loading="this.videos.length < 1"
              hide-default-footer
              disable-sort
              sort-by="createdAt"
              sort-desc
            >
              <template v-slot:item.size="{ item }">
                <p>{{ bytesToSize(item.size) }}</p>
              </template>
              <template v-slot:item.createdAt="{ item }">
                <p>{{ formatTime(item.createdAt, "DD.MM.YYYY kk:mm" ) }}</p>
              </template>
            </v-data-table>
          </v-card-text>
        </material-card>
      </v-col>

<!--      new devices-->
      <v-col
        cols="12"
        md="6"
      >
        <material-card
          icon="mdi-monitor-cellphone-star"
          icon-small
          color="#254AA5"
          title="Die neuesten Geräte"
        >
          <v-card-text>
            <v-data-table
              :headers="deviceHeaders"
              :items="this.devices.slice(0,5)"
              :loading="this.devices.length < 1"
              disable-sort
              sort-by="createdAt"
              sort-desc
              no-data-text="Es scheint keine neuen Geräte zu geben"
              loading-text="Geräte werden geladen..."
              hide-default-footer
            >
              <template v-slot:item.createdAt="{ item }">
                <p>{{ formatTime(item.createdAt, "DD.MM.YYYY kk:mm" ) }}</p>
              </template>
              <template v-slot:item.lastRequest="{ item }">
                <v-icon :color="item.lastRequest > (new Date).valueOf() - 300000 ? 'success' : 'error'">
                  mdi-{{ item.lastRequest > (new Date).valueOf() - 300000 ? 'wifi' : 'wifi-off' }}
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'
  import moment from 'moment'

  export default {
    name: 'DashboardView',

    data: () => ({
      videoHeaders: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Größe',
          value: 'size',
        },
        {
          text: 'Erstellt',
          value: 'createdAt',
        },
      ],
      deviceHeaders: [
        {
          text: 'Standort',
          value: 'location',
        },
        {
          text: 'Beschreibung',
          value: 'description',
        },
        {
          text: 'Status',
          value: 'lastRequest',
        },
        {
          text: 'Erstellt',
          value: 'createdAt',
        },
      ],
      stats: [
        {
          actionIcon: 'mdi-calendar-range',
          actionText: `Heute - ${moment(new Date()).format('DD.MM.YYYY')}`,
          color: 'primary',
          icon: 'mdi-creation',
          title: 'Neue Videos',
          value: '0',
        },
        {
          // actionIcon: 'mdi-history',
          actionText: '-',
          color: 'success',
          icon: 'mdi-wifi',
          title: 'Geräte Online',
          value: '215',
        },
        {
          // actionIcon: 'mdi-history',
          actionText: '-',
          color: 'error',
          icon: 'mdi-wifi-off',
          title: 'Geräte Offline',
          value: '5',
        },
        {
          actionIcon: 'mdi-calendar-range',
          actionText: `Heute - ${moment(new Date()).format('DD.MM.YYYY')}`,
          color: '#254AA5',
          icon: 'mdi-monitor-clean',
          title: 'Neue Geräte',
          value: '2',
        },
        // {
        //   actionIcon: 'mdi-tag',
        //   actionText: 'Tracked from Google Analytics',
        //   color: 'primary',
        //   icon: 'mdi-chart-bar',
        //   title: 'Website Visits',
        //   value: '75.521',
        // },
        // {
        //   actionIcon: 'mdi-calendar-range',
        //   actionText: 'Last 24 Hours',
        //   color: 'success',
        //   icon: 'mdi-store',
        //   title: 'Revenue',
        //   value: '$34,245',
        // },
        // {
        //   actionIcon: 'mdi-history',
        //   actionText: 'Just Updated',
        //   color: '#254AA5',
        //   icon: 'mdi-twitter',
        //   title: 'Followers',
        //   value: '+245',
        // },
      ],
    }),
    computed: {
      videos: get('app/videos'),
      devices: get('app/devices'),
      sales: get('sales/sales'),
    },
    methods: {
      formatTime: function (time, format) {
        return moment(time).format(format)
      },
      bytesToSize: function (bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return '0 Byte'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
      },
    },
  }
</script>
<style lang="sass">
.v-card.v-card--material
  > .v-card__title
    > .v-card--material__title
      flex: 1 1 auto
      word-break: break-word

.v-card--material-stats.v-card--material .v-card--material__title
  color: #999999
  font-size: .875rem !important
  margin-left: auto
  text-align: right

.v-card__subtitle--material-stats
  color: #3C4858
</style>
