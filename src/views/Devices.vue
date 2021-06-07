<template>
  <v-container
    id="data-tables-view"
    fluid
    tag="section"
  >
    <material-card
      color="accent"
      title="Geräte"
    >
      <v-card-text>
        <v-data-table
          item-key="videoUUID"
          :headers="headers"
          :items="this.devices"
          :search.sync="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-0"
          multi-sort
          sort-by="filNr"
          no-results-text="Es wurde leider nichts gefunden"
          no-data-text="Es scheint keine Videos zu geben"
          loading-text="Videos werden geladen..."
          :loading="this.devices.length < 1"
          @page-count="pageCount = $event"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                class="ml-auto"
                hide-details
                label="Suchen.."
                single-line
                style="max-width: 150px;"
              />
              <v-spacer />
            </v-toolbar>
          </template>
          <template v-slot:item.updatedAt="{ item }">
            <p>{{ formatTime(item.updatedAt, "DD.MM.YYYY kk:mm" ) }}</p>
          </template>
          <template v-slot:item.lastRequest="{ item }">
            <v-icon :color="item.lastRequest > (new Date).valueOf() - 300000 ? 'success' : 'error'">
              mdi-{{ item.lastRequest > (new Date).valueOf() - 300000 ? 'wifi' : 'wifi-off' }}
            </v-icon>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-dialog
              v-for="(action, i) in actions"
              :key="i"
              transition="dialog-bottom-transition"
              :max-width="action.width"
            >
              <template v-slot:activator="{ on, attrs }">
                <app-btn
                  :style="action.disabled ? 'display:none' : ''"
                  v-bind="attrs"
                  :color="action.color"
                  class="px-2 ml-1"
                  elevation="0"
                  min-width="0"
                  :disabled="action.disabled"
                  small
                  text
                  v-on="on"
                  @click="actionHandle(action, item)"
                >
                  <v-icon v-text="action.icon" />
                </app-btn>
              </template>
              <template
                v-slot:default="dialog"
              >
                <v-card>
                  <v-toolbar
                    :color="action.color"
                    dark
                  >
                    <v-toolbar-title>
                      <v-icon
                        v-text="action.icon"
                      />
                      {{ action.title }}
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <div v-if="action.action === 'ssh' || action.action === 'restart'">
                      <div class="text-h3 pa-3">
                        {{ action.text }}
                      </div>
                      <v-divider class="mx-3 mb-2" />
                      <div class="mx-3 mb-2">
                        {{ action.info }}
                      </div>
                    </div>
                    <div v-else-if="action.action === 'edit'">
                      <v-form
                        ref="form"
                        v-model="valid"
                        class="pa-3"
                        lazy-validation
                      >
                        <v-text-field
                          v-model="selectedItem.location"
                          class="pb-1"
                          type="text"
                          label="Standort"
                          :rules="editFields.rules.location"
                        />
                        <v-text-field
                          v-model="selectedItem.description"
                          class="pb-1"
                          type="text"
                          label="Beschreibung"
                        />
                        <v-text-field
                          v-model="selectedItem.orientation"
                          class="pb-1"
                          type="text"
                          label="Ausrichtung"
                          :rules="editFields.rules.orientation"
                        />
                        <v-radio-group
                          v-model="selectedItem.rotation"
                          row
                          mandatory
                        >
                          <v-radio
                            label="Ohne Rotation"
                            value="null"
                          />
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-radio
                                value="Links"
                                v-bind="attrs"
                                v-on="on"
                              >
                                <template v-slot:label>
                                  <v-icon
                                    left
                                    style="transform: scale(-1, 1)"
                                  >
                                    mdi-phone-rotate-landscape
                                  </v-icon>
                                  Links
                                </template>
                              </v-radio>
                            </template>
                            <span>Nach Links rotiert</span>
                          </v-tooltip>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-radio
                                value="Rechts"
                                v-bind="attrs"
                                v-on="on"
                              >
                                <template v-slot:label>
                                  <v-icon
                                    left
                                  >
                                    mdi-phone-rotate-landscape
                                  </v-icon>
                                  Rechts
                                </template>
                              </v-radio>
                            </template>
                            <span>Nach Rechts rotiert</span>
                          </v-tooltip>
                        </v-radio-group>
                        <v-btn
                          :disabled="!valid || loadingButton"
                          :loading="loadingButton"
                          color="success"
                          class="mr-4"
                          @click="sendEdit(item);dialog.value = false; resetValidation(action.action)"
                        >
                          Speichern
                        </v-btn>
                      </v-form>
                      <v-divider class="mx-3 mb-2 mt-8" />
                      <div class="mx-3 mb-2">
                        {{ action.info }}
                      </div>
                    </div>
                    <div v-else-if="action.action === 'delete'">
                      <div class="text-h3 pa-3">
                        {{ action.text }}
                      </div>
                      <v-btn
                        block
                        color="error"
                        @click="sendDelete(); dialog.value = false"
                      >
                        Löschen
                      </v-btn>
                      <v-divider class="mx-3 mb-2 mt-4" />
                      <div class="mx-3 mb-2">
                        {{ action.info }}
                      </div>
                    </div>
                    <div v-else-if="action.action === 'link'">
                      <div class="text-h3 pa-3" />
                      <v-row
                        justify="center"
                        class="mx-3"
                      >
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <v-expansion-panels
                            accordion
                          >
                            <v-expansion-panel
                              v-for="(item, i) in videos"
                              :key="i"
                            >
                              <v-expansion-panel-header> {{ item.name }} </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                {{ item }}
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <v-expansion-panels
                            accordion
                          >
                            <v-expansion-panel
                              v-for="(item, i) in devices"
                              :key="i"
                            >
                              <v-expansion-panel-header> {{ item.location }} </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                {{ item }}
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </v-col>
                      </v-row>
                      <v-divider class="mx-3 mb-2 mt-4" />
                      <div class="mx-3 mb-2">
                        {{ action.info }}
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn
                      text
                      @click="dialog.value = false; resetValidation(action.action)"
                    >
                      Schließen
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
          />
        </div>
      </v-card-text>
    </material-card>
    <v-snackbar
      v-model="alert.value"
      class="v-snackbar--material"
      timeout="-1"
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
        <!--        Welcome to <span class="font-weight-bold">&nbsp;MATERIAL DASHBOARD PRO&nbsp;</span> — a beautiful admin panel for every web developer.-->
      </v-alert>
    </v-snackbar>
  </v-container>
</template>

<script>
  import { sync } from 'vuex-pathify'
  import MaterialCard from '@/components/MaterialCard'
  import axios from 'axios'
  import _ from 'lodash'
  import moment from 'moment'
  export default {
    name: 'Devices',
    components:
      {
        MaterialCard,
      },
    data: () => ({
      alert: {
        value: false,
        type: 'error',
        text: 'Oopsie.. :(',
      },
      valid: true,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      loading: false,
      loadingButton: false,
      actions: [
        {
          color: 'success',
          icon: 'mdi-monitor',
          action: 'ssh',
          disabled: false,
          width: 600,
          title: 'SSH',
          text: 'Die SSH Anfrage wurde in einem neuen Fenster geöffnet.',
          info: 'Bitte stellen Sie sicher das WinSCP oder Putty installiert ist.',
        },
        {
          color: '',
          icon: 'mdi-refresh',
          action: 'restart',
          disabled: true,
          width: 600,
          title: 'Neustart',
          text: 'Dieser Bereich befindet sich noch in der Entwicklung.',
          info: 'Dieser Bereich befindet sich noch in der Entwicklung.',
        },
        {
          color: 'black',
          icon: 'mdi-auto-fix',
          action: 'link',
          disabled: true,
          width: null,
          title: 'Links',
          text: '',
          info: 'Dieser Bereich befindet sich noch in der Entwicklung.',
        },
        {
          color: 'info',
          icon: 'mdi-pencil',
          action: 'edit',
          disabled: false,
          width: 600,
          title: 'Ändern',
          text: '',
          info: '',
        },
        {
          color: 'error',
          icon: 'mdi-close',
          action: 'delete',
          disabled: false,
          width: 600,
          title: 'Löschen',
          text: 'Sind Sie sich sicher, dass dieses Gerät gelöscht werden soll ?',
          info: 'Gelöschte Geräte sind nicht wiederherstellbar, werden aber bei der nächsten Anfrage wieder angelegt.',
        },
      ],
      headers: [
        {
          text: 'ID',
          value: 'id',
          filterable: false,
        },
        {
          text: 'Standort',
          value: 'location',
        },
        {
          text: 'Beschreibung',
          value: 'description',
        },
        {
          text: 'Ausrichtung',
          value: 'orientation',
        },
        {
          text: 'Rotation',
          value: 'rotation',
        },
        {
          text: 'Letzte Änderung',
          value: 'updatedAt',
          filterable: false,
        },
        {
          text: 'Status',
          value: 'lastRequest',
          filterable: false,
        },
        // {
        //   text: 'Verlinkungen',
        //   value: 'link.length',
        // },
        {
          sortable: false,
          text: '',
          value: 'actions',
        },
      ],
      items: [],
      editFields: {
        rules: {
          location: [
            v => !!v || 'Der Standort ist ein Pflichtfeld',
            v => /^\d{3}\s-\s.*/.test(v) || 'Bitte auf das Format achten -> 000 - HierDerName',
          ],
          orientation: [
            v => /^(?=[\s\S])/.test(v) ? /^(hoch|breit)$/i.test(v) || 'Hoch oder Breit' : true,
          ],
          rotation: [
            v => /^(?=[\s\S])/.test(v) ? /^(rechts|links)$/i.test(v) || 'Rechts oder Links' : true,
          ],
        },
      },
      selectedItem: {},
      search: undefined,
    }),
    computed: {
      ...sync('app', [
        'devices',
        'videos',
      ]),
    },
    methods: {
      formatTime: function (time, format) {
        return moment(time).format(format)
      },
      unixToReadable (ms, format) {
        return moment(moment.unix(ms / 1000)).format(format)
      },
      actionHandle: function (action, item) {
        this[action.action](item)
      },
      ssh: function (item) {
        window.open('ssh://pi@' + item.ip)
      },
      restart: function (item) {
        // todo: add restart at some point
      },
      link: function (item) {
        // todo: add link dialog
        this.selectedItem = Object.assign(this.selectedItem, item)
      },
      edit: function (item) {
        this.selectedItem = Object.assign(this.selectedItem, item)
      },
      sendEdit: function (item) {
        if (this.validate()) {
          this.loadingButton = true
          axios.put('http://kodizabbix:3330/v2/device',
                    _.pick(this.selectedItem, 'deviceUUID', 'location', 'description', 'orientation', 'rotation'),
          ).then((response) => {
            this.loadingButton = false
            Object.assign(item, this.selectedItem)
            this.alert = {
              value: true,
              type: 'success',
              text: response.data.message,
            }
          }).catch((error) => {
            this.loadingButton = false
            this.alert = {
              value: true,
              type: 'error',
              text: error.response.data.message,
            }
          }).finally(() => {
            this.selectedItem = {}
          })
        }
      },
      delete: function (item) {
        this.selectedItem = item
      },
      sendDelete: function () {
        console.log('???')
        axios.delete(`http://kodizabbix:3330/v2/device/${this.selectedItem.deviceUUID}`)
          .then((response) => {
            const itemPos = this.devices.map(function (x) { return x.id }).indexOf(this.selectedItem.id)
            this.devices.splice(itemPos, 1)
            this.alert = {
              value: true,
              type: 'success',
              text: response.data.message,
            }
          })
          .catch(error => {
            this.alert = {
              value: true,
              type: 'error',
              text: error.response.data.message,
            }
          })
      },
      validate: function () {
        return this.$refs.form[0].validate()
      },
      resetValidation: function (action) {
        if (action === 'edit') { this.$refs.form[0].resetValidation() }
      },
    },
  }
</script>
<style lang="sass">
.v-snackbar--material
  margin-top: 32px
  margin-bottom: 32px

  .v-alert
    padding: 32px 16px

  .v-alert--material,
  .v-snack__wrapper
    border-radius: 4px

  .v-snack__content
    overflow: visible
    padding: 0

  .v-snack__action
    display: none
</style>
