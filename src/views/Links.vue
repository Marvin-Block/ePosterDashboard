<template>
  <v-container
    id="data-tables-view"
    fluid
    tag="section"
  >
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
          <div class="text-center text-h4 font-weight-light mb-6">
            Bitte wählen Sie mindestens ein (1) Video aus.
          </div>
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
              </v-toolbar>
            </template>
          </v-data-table>
        </v-tab-item>

        <v-tab-item class="pb-12">
          <div class="text-center text-h4 font-weight-light mb-6">
            Bitte wählen Sie mindestens ein (1) Gerät aus.
          </div>
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
              </v-toolbar>
            </template>
          </v-data-table>
        </v-tab-item>

        <v-tab-item class="pb-12">
          <div class="text-center text-h4 grey--text font-weight-light mb-6">
            In welchem Zeitraum sollen die Inhalte angezeigt werden ?
          </div>

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
                show-adjacent-months
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-row>
                <v-col>
                  <v-menu
                    ref="menu"
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
                        label="Start Uhrzeit"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="startTimeMenu"
                      v-model="startTime"
                      full-width
                      format="24hr"
                      scrollable
                      @click:minute="$refs.menu.save(startTime)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-menu
                    ref="menu"
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
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="endTimeMenu"
                      v-model="endTime"
                      full-width
                      format="24hr"
                      scrollable
                      @click:minute="$refs.menu.save(endTime)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-divider
                class="mt-4"
              />
              <p>von: {{ startTime }} - bis: {{ endTime }} </p>
            </v-col>
          </v-row>
        </v-tab-item>
      </material-wizard>
    </validation-observer>
  </v-container>
</template>

<script>
  import { get } from 'vuex-pathify'
  export default {
    name: 'Links',

    data: () => ({
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
      account: [],
      accounts: [
        {
          icon: 'mdi-pencil',
          type: 'design',
        },
        {
          icon: 'mdi-code-tags',
          type: 'code',
        },
        {
          icon: 'mdi-laptop',
          type: 'develop',
        },
      ],
      address: '',
      city: '',
      email: '',
      first: '',
      image: null,
      last: '',
      state: '',
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
      ],
      street: '',
      tab: 0,
      tabs: ['Videos', 'Geräte', 'Zeitraum'],
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
    }),
    computed: {
      videos: get('app/videos'),
      devices: get('app/devices'),
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
      stringAccount () {
        return this.account.join(',')
      },
      scope () {
        if (this.tab === 0) return 'videos'
        else if (this.tab === 2) return 'geräte'
        return 'zeitraum'
      },
      availableSteps () {
        const steps = [0]

        if (this.videoSelected.length > 0) steps.push(1)

        if (this.deviceSelected.length > 0 && steps.includes(1)) steps.push(2)

        if (
          steps.includes(2)
        ) steps.push(3)
        console.log(this.videoSelected, this.deviceSelected)
        return steps
      },
    },
    methods: {
      next (valid) {
        if (!valid) return

        if (this.tab === this.tabs.length - 1) {
          alert('Form finished')
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
