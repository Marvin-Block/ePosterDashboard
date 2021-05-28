<template>
  <v-container
    id="data-tables-view"
    fluid
    tag="section"
  >
    <!--    todo: add validation -->
    <validation-observer v-slot="{ valid }">
      <material-wizard
        v-model="tab"
        :available-steps="availableSteps"
        :items="tabs"
        class="mx-auto"
        @click:next="next(valid)"
        @click:prev="tab--"
      >
        <v-tab-item class="pb-12">
<!--          <v-row>-->
<!--            <v-col-->
<!--              cols="12"-->
<!--              md="6"-->
<!--            >-->
<!--              <v-chip-->
<!--                v-if="deviceSelected.length < 1"-->
<!--                class="ma-2 text-h5"-->
<!--                color="error"-->
<!--                outlined-->
<!--              >-->
<!--                <v-icon left>-->
<!--                  mdi-exclamation-->
<!--                </v-icon>-->
<!--                Bitte wählen Sie mindestens ein (1) Gerät aus-->
<!--              </v-chip>-->
<!--              <v-chip-->
<!--                v-else-->
<!--                class="ma-2 text-h5"-->
<!--                color="success"-->
<!--                outlined-->
<!--              >-->
<!--                Aktuelle auswahl: {{ deviceSelected.length }}-->
<!--              </v-chip>-->
<!--            </v-col>-->
<!--            <v-col-->
<!--              cols="12"-->
<!--              md="6"-->
<!--            >-->
<!--              <div-->
<!--                class="float-right"-->
<!--              >-->
<!--                <v-btn-->
<!--                  class="hidden-sm-and-down"-->
<!--                  color="blue"-->
<!--                  dark-->
<!--                  tile-->
<!--                  @click="deviceHelpDialog = !deviceHelpDialog"-->
<!--                >-->
<!--                  <v-icon-->
<!--                    left-->
<!--                  >-->
<!--                    mdi-help-->
<!--                  </v-icon>-->
<!--                  Hilfe-->
<!--                </v-btn>-->
<!--              </div>-->
<!--            </v-col>-->
<!--          </v-row>-->
          <v-data-table
            v-model="deviceSelected"
            :headers="deviceHeaders"
            :items="devices"
            item-key="id"
            show-select
            :search.sync="deviceSearch"
            class="elevation-0"
            multi-sort
            no-results-text="Es wurde leider nichts gefunden"
            no-data-text="Es scheint keine Geräte zu geben"
            loading-text="Geräte werden geladen..."
            :loading="devices.length < 1"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-text-field
                  v-model="deviceSearch"
                  prepend-inner-icon="mdi-magnify"
                  class="ml-auto"
                  hide-details
                  label="Suchen.."
                  single-line
                  style="max-width: 150px;"
                />
                <v-spacer />
                <v-chip
                  v-if="deviceSelected.length < 1"
                  class="ma-2 text-h5"
                  color="error"
                  outlined
                >
                  <v-icon left>
                    mdi-exclamation
                  </v-icon>
                  Bitte wählen Sie mindestens ein (1) Gerät aus
                </v-chip>
                <v-chip
                  v-else
                  class="ma-2 text-h5"
                  color="success"
                  outlined
                >
                  Aktuelle auswahl: {{ deviceSelected.length }}
                </v-chip>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-tab-item>

        <v-tab-item class="pb-12">
<!--          <v-row>-->
<!--            <v-col-->
<!--              cols="12"-->
<!--              md="6"-->
<!--            >-->
<!--              <v-chip-->
<!--                v-if="videoSelected.length < 1"-->
<!--                class="ma-2 text-h5"-->
<!--                color="error"-->
<!--                outlined-->
<!--              >-->
<!--                <v-icon left>-->
<!--                  mdi-exclamation-->
<!--                </v-icon>-->
<!--                Bitte wählen Sie mindestens ein (1) Video aus-->
<!--              </v-chip>-->
<!--              <v-chip-->
<!--                v-else-->
<!--                class="ma-2 text-h5"-->
<!--                color="success"-->
<!--                outlined-->
<!--              >-->
<!--                Aktuelle auswahl: {{ videoSelected.length }}-->
<!--              </v-chip>-->
<!--            </v-col>-->
<!--            <v-col-->
<!--              cols="12"-->
<!--              md="6"-->
<!--            >-->
<!--              <div-->
<!--                class="float-right"-->
<!--              >-->
<!--                <v-btn-->
<!--                  class="hidden-sm-and-down"-->
<!--                  color="blue"-->
<!--                  dark-->
<!--                  tile-->
<!--                  @click="videoHelpDialog = !videoHelpDialog"-->
<!--                >-->
<!--                  <v-icon-->
<!--                    left-->
<!--                  >-->
<!--                    mdi-help-->
<!--                  </v-icon>-->
<!--                  Hilfe-->
<!--                </v-btn>-->
<!--              </div>-->
<!--            </v-col>-->
<!--          </v-row>-->
          <v-data-table
            v-model="videoSelected"
            :headers="videoHeaders"
            :items="videos"
            item-key="id"
            show-select
            :search.sync="videoSearch"
            class="elevation-0"
            multi-sort
            no-results-text="Es wurde leider nichts gefunden"
            no-data-text="Es scheint keine Videos zu geben"
            loading-text="Videos werden geladen..."
            :loading="videos.length < 1"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-text-field
                  v-model="videoSearch"
                  prepend-inner-icon="mdi-magnify"
                  class="ml-auto"
                  hide-details
                  label="Suchen.."
                  single-line
                  style="max-width: 150px;"
                />
                <v-spacer />
                <v-chip
                  v-if="videoSelected.length < 1"
                  class="ma-2 text-h5"
                  color="error"
                  outlined
                >
                  <v-icon left>
                    mdi-exclamation
                  </v-icon>
                  Bitte wählen Sie mindestens ein (1) Video aus
                </v-chip>
                <v-chip
                  v-else
                  class="ma-2 text-h5"
                  color="success"
                  outlined
                >
                  Aktuelle auswahl: {{ videoSelected.length }}
                </v-chip>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-tab-item>

        <v-tab-item class="pb-12">
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-chip
                v-if="dates.length < 2"
                class="ma-2 text-h5 float-right"
                color="error"
                outlined
              >
                <v-icon left>
                  mdi-exclamation
                </v-icon>
                Bitte wählen Sie einen Zeitraum aus
              </v-chip>
              <div
                v-else
              >
                <v-chip
                  class="ma-2 text-h5 float-right"
                  color="success"
                  outlined
                >
                  Bis: {{ dates[1] }} {{ endTime ? endTime + ' Uhr' : '' }}
                </v-chip>
                <v-chip
                  class="ma-2 text-h5 float-right"
                  color="success"
                  outlined
                >
                  Von: {{ dates[0] }} {{ startTime ? startTime + ' Uhr' : '' }}
                </v-chip>
              </div>
            </v-col>
<!--            <v-col-->
<!--              cols="12"-->
<!--              md="6"-->
<!--            >-->
<!--              <div-->
<!--                class="float-right"-->
<!--              >-->
<!--                <v-btn-->
<!--                  class="hidden-sm-and-down"-->
<!--                  color="blue"-->
<!--                  dark-->
<!--                  tile-->
<!--                  @click="timeHelpDialog = !timeHelpDialog"-->
<!--                >-->
<!--                  <v-icon-->
<!--                    left-->
<!--                  >-->
<!--                    mdi-help-->
<!--                  </v-icon>-->
<!--                  Hilfe-->
<!--                </v-btn>-->
<!--              </div>-->
<!--            </v-col>-->
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-date-picker
                v-model="dates"
                range
                scrollable
                show-week
                full-width
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-row>
                <v-col>
                  <v-menu
                    ref="startMenu"
                    v-model="startTimeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="startTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startTime"
                        label="Anfangs Uhrzeit"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-time-picker
                      v-if="startTimeMenu"
                      v-model="startTime"
                      full-width
                      format="24hr"
                      scrollable
                      @click:minute="$refs.startMenu.save(startTime)"
                    />
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-menu
                    ref="endMenu"
                    v-model="endTimeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="endTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="endTime"
                        label="End Uhrzeit"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-time-picker
                      v-if="endTimeMenu"
                      v-model="endTime"
                      full-width
                      format="24hr"
                      scrollable
                      @click:minute="$refs.endMenu.save(endTime)"
                    />
                  </v-menu>
                </v-col>
              </v-row>
              <v-divider
                class="mt-4"
              />
<!--              <v-card-->
<!--                flat-->
<!--                tile-->
<!--              >-->
<!--                <v-card-text class="text-h4 mt-4">-->
<!--                  <b>Von: {{ dates[0] }} {{ startTime }} Uhr<br><br>Bis: {{ dates[1] }} {{ endTime }} Uhr</b>-->
<!--                </v-card-text>-->
<!--              </v-card>-->
            </v-col>
          </v-row>
        </v-tab-item>
      </material-wizard>
    </validation-observer>
    <v-snackbar
      v-model="alert.value"
      class="v-snackbar--material"
      timeout="5000"
      bottom
      right
      color="transparent"
    >
      <v-alert
        v-model="alert.value"
        class="ma-0"
        :type="alert.type"
        dismissible
      >
        {{ alert.text }}
      </v-alert>
    </v-snackbar>
    <v-dialog
      v-model="deviceHelpDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          flat
          tile
          color="blue"
        >
          <v-toolbar-title>Hilfe zur Auswahl der Geräte</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="deviceHelpDialog = !deviceHelpDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-row
          align="center"
          class="mt-2"
        >
          <v-col>
            <v-window
              v-model="window"
              class="elevation-3 ml-10"
              vertical
            >
              <v-window-item
                v-for="n in length"
                :key="n"
              >
                <v-card flat>
                  <v-card-text>
                    <v-row
                      class="mb-4"
                      align="center"
                    >
                      <strong
                        class="text-h3 ml-2 mt-2"
                      >
                        Title {{ n }}
                      </strong>
                    </v-row>
                    <v-img
                      contain
                      src="@/assets/test1.png"
                      max-height="80vh"
                    >
                    </v-img>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-col>
          <v-item-group
            v-model="window"
            class="shrink mr-6"
            mandatory
            tag="v-flex"
          >
            <v-item
              v-for="n in length"
              :key="n"
              v-slot="{ active, toggle }"
            >
              <div>
                <v-btn
                  :input-value="active"
                  icon
                  @click="toggle"
                >
                  <v-icon>mdi-record</v-icon>
                </v-btn>
              </div>
            </v-item>
          </v-item-group>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { get } from 'vuex-pathify'
  import axios from 'axios'
  import _ from 'lodash'
  export default {
    name: 'Links',

    data: () => ({
      window: 0,
      length: 3,
      alert: {
        value: false,
        type: 'error',
        text: 'Oopsie.. :(',
      },
      deviceHelpDialog: false,
      videoHelpDialog: false,
      timeHelpDialog: false,
      dateMenu: false,
      dates: [],
      startTime: null,
      startTimeMenu: false,
      endTime: null,
      endTimeMenu: false,
      videoSearch: '',
      videoSelected: [],
      deviceSearch: '',
      deviceSelected: [],
      tab: 0,
      tabs: ['Geräte', 'Videos', 'Zeitraum'],
      videoHeaders: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Ausrichtung',
          value: 'orientation_V2',
        },
        {
          text: 'Rotation',
          value: 'rotation',
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
      ],
      deviceHelpImages: [
        {
          title: 'Test 1',
          image: '@/assets/test1.png',
        },
        {
          title: 'Test 2',
          image: '@/assets/test2.png',
        },
        {
          title: 'Test 3',
          image: '@/assets/test3.png',
        },
      ],
      videoHelpImages: [
        {
          title: '',
          image: '',
        },
        {
          title: '',
          image: '',
        },
        {
          title: '',
          image: '',
        },
      ],
      timeHelpImages: [
        {
          title: '',
          image: '',
        },
        {
          title: '',
          image: '',
        },
        {
          title: '',
          image: '',
        },
      ],
    }),
    computed: {
      videos: get('app/videos'),
      devices: get('app/devices'),
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
      scope () {
        if (this.tab === 0) return 'videos'
        else if (this.tab === 2) return 'geräte'
        return 'zeitraum'
      },
      availableSteps () {
        const steps = [0]

        if (this.deviceSelected.length > 0) steps.push(1)

        if (this.videoSelected.length > 0 && steps.includes(1)) steps.push(2)

        if (
          steps.includes(2)
        ) steps.push(3)
        return steps
      },
    },
    methods: {
      next (valid) {
        if (!valid) return

        if (this.tab === this.tabs.length - 1) {
          const postData = new FormData()
          const postVideos = []
          const postDevices = []
          this.videoSelected.forEach(video => {
            postVideos.push(video.videoUUID)
          })
          this.deviceSelected.forEach(device => {
            postDevices.push(device.deviceUUID)
          })
          postData.append('content', postVideos)
          postData.append('devices', postDevices)
          postData.append('start', new Date(this.dates[0] + ' ' + this.startTime).valueOf())
          postData.append('end', new Date(this.dates[1] + ' ' + this.endTime).valueOf())
          postData.append('active', 1)
          console.log()
          axios.post('http://kodizabbix:3330/v2/link', postData, {
            'Content-Type': 'multipart/form-data',
          }).then((response) => {
            console.log(response)
            this.alert = {
              value: true,
              type: 'success',
              text: response.data.message,
            }
          }).catch((error) => {
            console.log(error.response)
            this.alert = {
              value: true,
              type: 'error',
              text: error.response.data.message,
            }
          }).finally(() => {
            this.videoSelected = []
            this.deviceSelected = []
            this.tab = 0
          })
        } else {
          this.tab++
        }
      },
      onChange (val) {
        const value = val.target.files[0]

        if (!value) return (this.image = null)

        this.image = URL.createObjectURL(value)
      },
    },
  }
</script>

<style lang="sass">
  .v-dialog--fullscreen
    overflow: hidden !important
</style>
