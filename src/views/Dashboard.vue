<template>
  <v-container
    id="dashboard-view"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="(chart, i) in charts"
            :key="`chart-${i}`"
            cols="12"
            md="6"
            lg="4"
          >
            <material-chart-card
              :color="chart.color"
              :data="chart.data"
              :options="chart.options"
              :responsive-options="chart.responsiveOptions"
              :title="chart.title"
              :type="chart.type"
            >
              <template #subtitle>
                <div class="font-weight-light text--secondary">
                  <div v-html="chart.subtitle" />
                </div>
              </template>

              <template #actions>
                <v-icon
                  class="mr-1"
                  small
                >
                  mdi-clock-outline
                </v-icon>

                <span
                  class="text-caption grey--text font-weight-light"
                  v-text="chart.time"
                />
              </template>
            </material-chart-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        v-for="({ actionIcon, actionText, ...attrs }, i) in stats"
        :key="i"
        cols="12"
        md="6"
        lg="3"
      >
        <material-stat-card v-bind="attrs">
          <template #actions>
            <v-icon
              class="mr-2"
              small
              v-text="actionIcon"
            />
            <div class="text-truncate">
              {{ actionText }}
            </div>
          </template>
        </material-stat-card>
      </v-col>

      <v-col cols="12" />
      <v-col cols="12" md="6">
        <material-card
          icon="mdi-widgets"
          icon-small
          color="accent"
          title="Die neuesten Videos"
        >
          <v-card-text>
            <v-data-table
              :headers="headers"
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
      <v-col cols="12" md="6">
        <material-card
          icon="mdi-monitor-cellphone-star"
          icon-small
          color="#254AA5"
          title="Die neuesten Geräte"
        >
          <v-card-text>
            <v-data-table
              no-data-text="Es scheint keine neuen Geräte zu geben"
              loading-text="Geräte werden geladen..."
              hide-default-footer
            >
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
  import Vue from 'vue'
  import moment from "moment";

  const lineSmooth = Vue.chartist.Interpolation.cardinal({
    tension: 0,
  })

  export default {
    name: 'DashboardView',

    data: () => ({
      headers: [
        // {
        //   text: 'ID',
        //   value: 'id',
        // },
        {
          text: 'KW',
          value: 'calendarWeek',
        },
        {
          text: 'Name',
          value: 'name',
        },
        // {
        //   text: 'Ausrichtung',
        //   value: 'orientation_V2',
        // },
        // {
        //   text: 'Rotation',
        //   value: 'rotation',
        // },
        {
          text: 'Größe',
          value: 'size',
        },
        {
          text: 'Erstellt',
          value: 'createdAt',
        },
        // {
        //   text: 'Verlinkungen',
        //   value: 'link.length',
        // },
        // {
        //   sortable: false,
        //   text: '',
        //   value: 'actions',
        // },
      ],
      countryData: {
        US: 2920,
        DE: 1390,
        AU: 760,
        GB: 690,
        RO: 600,
        BR: 550,
      },
      charts: [{
        type: 'Bar',
        color: 'primary',
        title: 'Website Views',
        subtitle: 'Last Campaign Performance',
        time: 'updated 10 minutes ago',
        data: {
          labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              },
            },
          }],
        ],
      }, {
        type: 'Line',
        color: 'success',
        title: 'Daily Sales',
        subtitle: '<i class="mdi mdi-arrow-up green--text"></i><span class="green--text">55%</span>&nbsp;increase in today\'s sales',
        time: 'updated 4 minutes ago',
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [
            [230, 750, 450, 300, 280, 240, 200, 190],
          ],
        },
        options: {
          lineSmooth,
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      }, {
        type: 'Line',
        color: '#254AA5',
        title: 'Completed Tasks',
        subtitle: 'Last Campaign Performance',
        time: 'campaign sent 26 minutes ago',
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            [12, 17, 7, 17, 23, 18, 38],
          ],
        },
        options: {
          lineSmooth,
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      }],
      listings: [
        {
          image: 2,
          location: 'Barcelona, Spain',
          price: '$899/night',
          text: 'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the life in Barcelona.',
          title: 'Cozy 5 Stars Apartment',
        },
        {
          image: 3,
          location: 'Office Studio',
          price: '$1.119/night',
          text: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
          title: 'Office Studio',
        },
        {
          image: 1,
          location: 'Milan, Italy',
          price: '$459/night',
          text: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
          title: 'Beautiful Castle',
        },
      ],
      stats: [
        {
          actionIcon: 'mdi-alert',
          actionText: 'Get More Space...',
          color: '#FD9A13',
          icon: 'mdi-sofa-single',
          title: 'Bookings',
          value: '184',
        },
        {
          actionIcon: 'mdi-tag',
          actionText: 'Tracked from Google Analytics',
          color: 'primary',
          icon: 'mdi-chart-bar',
          title: 'Website Visits',
          value: '75.521',
        },
        {
          actionIcon: 'mdi-calendar-range',
          actionText: 'Last 24 Hours',
          color: 'success',
          icon: 'mdi-store',
          title: 'Revenue',
          value: '$34,245',
        },
        {
          actionIcon: 'mdi-history',
          actionText: 'Just Updated',
          color: '#254AA5',
          icon: 'mdi-twitter',
          title: 'Followers',
          value: '+245',
        },
      ],
    }),
    computed: {
      videos: get('app/videos'),
      devices: get('app/devices'),
      sales: get('sales/sales'),
      totalSales () {
        return this.sales.reduce((acc, val) => acc + val.salesInM, 0)
      },
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
    }
  }
</script>
