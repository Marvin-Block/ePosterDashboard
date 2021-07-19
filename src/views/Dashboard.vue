<template>
  <v-container
    id="dashboard-view"
    fluid
    tag="section"
    style="margin-top:-80px"
  >
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <!--        <material-card-->
        <!--          color="grey"-->
        <!--          title="Erreichbarkeits Verlauf"-->
        <!--          icon-small-->
        <!--          icon="mdi-monitor-cellphone-star"-->
        <!--        >-->
        <!--          <v-card-text>-->
        <!--            <chartist-->
        <!--              :data="colouredLine.data"-->
        <!--              :options="colouredLine.options"-->
        <!--              type="Line"-->
        <!--              style="max-height: 150px;"-->
        <!--              class="mt-3"-->
        <!--            />-->
        <!--          </v-card-text>-->
        <!--        </material-card>-->
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <material-card
          color="#254AA5"
          title="Standorte"
          icon-small
          icon="mdi-map-marker"
        >
          <v-card-text>
            <div
              id="map"
              style="width: 100%; height: 400px;"
            />
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
    <v-row>
      <!--      stat cards below-->
      <v-col
        cols="12"
        md="6"
        lg="3"
      >
        <v-card
          class="v-card--material mt-4"
        >
          <v-card-title class="align-start">
            <v-sheet
              color="primary"
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
                  >
                    mdi-creation
                  </v-icon>
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
                Neue Videos
              </template>

              <div class="text-subtitle-1 mb-n2">
                <template>
                  <div
                    class="text-right text-h3 v-card__subtitle--material-stats"
                  >
                    {{ videosToday }}
                  </div>
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
              >
                mdi-calendar-range
              </v-icon>
              <div
                class="text-truncate"
              >
                Heute dazugekommen - {{ today }}
              </div>
            </v-card-actions>
          </template>
        </v-card>
      </v-col>

      <!----------------------------------------->

      <v-col
        cols="12"
        md="6"
        lg="3"
      >
        <v-card
          class="v-card--material mt-4"
        >
          <v-card-title class="align-start">
            <v-sheet
              color="success"
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
                  >
                    mdi-wifi
                  </v-icon>
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
                Geräte Online
              </template>

              <div class="text-subtitle-1 mb-n2">
                <template>
                  <div
                    class="text-right text-h3 v-card__subtitle--material-stats"
                  >
                    {{ onlineDevices }}
                  </div>
                </template>
              </div>
            </div>
          </v-card-title>
          <template>
            <v-divider class="mt-2 mx-4" />

            <v-card-actions class="px-4 text-caption grey--text">
              <div class="mr-2 mt-5" />
              <div class="text-truncate" />
            </v-card-actions>
          </template>
        </v-card>
      </v-col>

      <!----------------------------------------->

      <v-col
        cols="12"
        md="6"
        lg="3"
      >
        <v-card
          class="v-card--material mt-4"
        >
          <v-card-title class="align-start">
            <v-sheet
              color="error"
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
                  >
                    mdi-wifi-off
                  </v-icon>
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
                Geräte Offline
              </template>

              <div class="text-subtitle-1 mb-n2">
                <template>
                  <div
                    class="text-right text-h3 v-card__subtitle--material-stats"
                  >
                    {{ offlineDevices }}
                  </div>
                </template>
              </div>
            </div>
          </v-card-title>
          <template>
            <v-divider class="mt-2 mx-4" />

            <v-card-actions class="px-4 text-caption grey--text">
              <div class="mr-2 mt-5" />
              <div class="text-truncate" />
            </v-card-actions>
          </template>
        </v-card>
      </v-col>

      <!----------------------------------------->

      <v-col
        cols="12"
        md="6"
        lg="3"
      >
        <v-card
          class="v-card--material mt-4"
        >
          <v-card-title class="align-start">
            <v-sheet
              color="#254AA5"
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
                  >
                    mdi-monitor-clean
                  </v-icon>
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
                Neue Geräte
              </template>

              <div class="text-subtitle-1 mb-n2">
                <template>
                  <div
                    class="text-right text-h3 v-card__subtitle--material-stats"
                  >
                    {{ devicesToday }}
                  </div>
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
              >
                mdi-calendar-range
              </v-icon>
              <div
                class="text-truncate"
              >
                Heute dazugekommen - {{ today }}
              </div>
            </v-card-actions>
          </template>
        </v-card>
      </v-col>

      <!----------------------------------------->

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
              :items="videos.items"
              no-data-text="Es scheint keine neuen Videos zu geben"
              loading-text="Videos werden geladen..."
              :loading="videos.status === 'loading'"
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
              :items="devices.slice(0,5)"
              :loading="devices.length < 1"
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
  import { call, get, sync } from 'vuex-pathify'
  import moment from 'moment'
  import Socket from '@/plugins/socket'
  import MaterialCard from '@/components/MaterialCard'
  import { Loader } from 'google-maps'

  export default {
    name: 'DashboardView',
    components: { MaterialCard },
    data: () => ({
      map: null,
      videoHeaders: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Größe',
          value: 'size'
        },
        {
          text: 'Erstellt',
          value: 'createdAt'
        }
      ],
      deviceHeaders: [
        {
          text: 'Standort',
          value: 'location'
        },
        {
          text: 'Beschreibung',
          value: 'description'
        },
        {
          text: 'Status',
          value: 'lastRequest'
        },
        {
          text: 'Erstellt',
          value: 'createdAt'
        }
      ],
      stats: [
        {
          // actionIcon: 'mdi-calendar-range',
          // actionText: `Heute - ${moment(new Date()).format('DD.MM.YYYY')}`,
          actionText: 'Statischer Inhalt',
          color: 'primary',
          icon: 'mdi-creation',
          title: 'Neue Videos',
          value: '0'
        },
        {
          // actionIcon: 'mdi-history',
          actionText: 'Statischer Inhalt',
          color: 'success',
          icon: 'mdi-wifi',
          title: 'Geräte Online',
          value: '215'
        },
        {
          // actionIcon: 'mdi-history',
          // actionText: '-',
          actionText: 'Statischer Inhalt',
          color: 'error',
          icon: 'mdi-wifi-off',
          title: 'Geräte Offline',
          value: '5'
        },
        {
          // actionIcon: 'mdi-calendar-range',
          // actionText: `Heute - ${moment(new Date()).format('DD.MM.YYYY')}`,
          actionText: 'Statischer Inhalt',
          color: '#254AA5',
          icon: 'mdi-monitor-clean',
          title: 'Neue Geräte',
          value: '2'
        }
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
      colouredLine: {
        data: {
          labels: ["'06", "'07", "'08", "'09", "'10", "'11", "'12", "'13", "'14", "'15"],
          series: [
            [275, 500, 290, 55, 700, 700, 500, 750, 630, 900, 930]
          ]
        },
        options: {
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      zoomFluid: undefined,
      zoomCoords: undefined
    }),
    computed: {
      videosToday: get('videos/videosToday'),
      filialen: get('app/filialen'),
      videos: get('videos/topFive'),
      devices: get('app/devices'),
      deviceHistory: get('app/deviceHistorie'),
      today: function () {
        return moment(new Date()).format('DD.MM.YYYY')
      },
      onlineDevices: function () {
        const result = this.devices.filter(device => device.lastRequest > (new Date()).valueOf() - 300000)
        return result.length
      },
      offlineDevices: function () {
        const result = this.devices.filter(device => device.lastRequest < (new Date()).valueOf() - 300000)
        return result.length
      },
      devicesToday: function () {
        const result = this.devices.filter(device => moment().diff(device.createdAt, 'days') === 0)
        return result.length
      }
      // videosToday: function () {
      //   const result = this.videos.filter(video => moment().diff(video.createdAt, 'days') === 0)
      //   return result.length
      // }
    },
    mounted () {
      console.log(this.videos)
    },
    beforeMount () {
      this.loadVideos()
      // Socket.send('video')
      Socket.send('device')
      // Socket.send('devicehistory')
      const loader = new Loader('AIzaSyDyWlypXz9Ul65CORLC8vKbUXMYlpWDBgM', {
        libraries: ['geometry', 'places', 'visualization']
      })
      loader.load().then((google) => {
        this.initMap(google)
      })
    },
    methods: {
      loadVideos: call('videos/load'),
      zoomTo () {
        if (this.zoomFluid === 10) { return 0 } else {
          this.zoomFluid++
          this.map.setZoom(this.zoomFluid)
          setTimeout(this.zoomTo(), 500)
        }
      },
      initMap (google) {
        // eslint-disable-next-line no-undef
        const map = new google.maps.Map(document.getElementById('map'), {
          // Koordinaten KODi Oberhausen Zum Eisenhammer 52
          center: { lat: 51.4899947, lng: 6.8473578 },
          // center: { lat: 51.1657, lng: 10.4515 },
          zoom: 6,
          disableDefaultUI: true,
          mapId: 'c01bff633aa1134d'
        })
        // const heatmapData = []
        const markerCluster = this.filialen.map((filiale) => {
          // eslint-disable-next-line no-undef
          const marker = new google.maps.Marker({
            // eslint-disable-next-line no-undef
            position: new google.maps.LatLng(filiale.Latitude, filiale.Longitude),
            icon: {
              path: 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z',
              // path: 'M 12 11.5 M 12 2 A 7 7 0 0 0 5 9 C 5 14.25 12 22 12 22 C 12 22 19 14.25 19 9 A 7 7 0 0 0 12 2 Z',
              fillColor: filiale.Status === 'Online' ? '#4caf50' : '#ff5252',
              fillOpacity: 1,
              // eslint-disable-next-line no-undef
              anchor: new google.maps.Point(12, 0),
              strokeWeight: 1,
              strokeColor: '#000'
            },
            map: map
          })
          google.maps.event.addListener(marker, 'click', () => {
            this.zoomCoords = marker.getPosition()
            this.zoomFluid = map.getZoom()
            map.panTo(this.zoomCoords)
            this.zoomTo()
          })
          return marker
        })
        // const cluster = new MarkerClusterer(map, markerCluster, {
        //   // imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        //   styles: [
        //     MarkerClusterer.withDefaultStyle({
        //       url: require('@/assets/map-marker.svg'),
        //       textColor: '#ff00ff',
        //       textSize: 10
        //     }),
        //     MarkerClusterer.withDefaultStyle({
        //       url: require('@/assets/map-marker.svg'),
        //       textColor: '#ff0000',
        //       textSize: 11
        //     }),
        //     MarkerClusterer.withDefaultStyle({
        //       url: require('@/assets/map-marker.svg'),
        //       textColor: '#ffffff',
        //       textSize: 12
        //     })
        //   ]
        // })
        // eslint-disable-next-line no-undef
        // const heatmap = new google.maps.visualization.HeatmapLayer({
        //   data: heatmapData,
        //   radius: 15,
        //   opacity: 0.6,
        //   gradient: [
        //     'rgba(0, 255, 255, 0)',
        //     'rgba(0, 255, 255, 1)',
        //     'rgba(0, 191, 255, 1)',
        //     'rgba(0, 127, 255, 1)',
        //     'rgba(0, 63, 255, 1)',
        //     'rgba(0, 0, 255, 1)',
        //     'rgba(0, 0, 223, 1)',
        //     'rgba(0, 0, 191, 1)',
        //     'rgba(0, 0, 159, 1)',
        //     'rgba(0, 0, 127, 1)',
        //     'rgba(63, 0, 91, 1)',
        //     'rgba(96, 11, 40, 1)',
        //     'rgba(192, 22, 80, 1)',
        //     'rgba(240, 28, 100, 1)'
        //   ]
        // })
        // heatmap.setMap(map)

        this.map = map
      },
      formatTime: function (time, format) {
        return moment(time).format(format)
      },
      bytesToSize: function (bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return '0 Byte'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
      }
    }
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

//  Disable watermark and footer options
.gmnoprint .gm-style-cc
  display: none !important

.gm-style-cc
  display: none !important

a[title="Dieses Gebiet in Google Maps öffnen (in neuem Fenster)"]
  display: none !important
</style>
