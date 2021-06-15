<!--suppress JSUnresolvedVariable, HtmlUnknownTag, JSUnusedGlobalSymbols -->
<template>
  <v-container
    id="data-tables-view"
    fluid
    tag="section"
  >
    <material-card
      color="accent"
      title="Videos"
    >
      <v-card-text>
        <v-data-table
          item-key="videoUUID"
          :headers="headers"
          :items="videos"
          :search.sync="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-0"
          multi-sort
          no-results-text="Es wurde leider nichts gefunden"
          no-data-text="Es scheint keine Videos zu geben"
          loading-text="Videos werden geladen..."
          :loading="videos.length < 1"
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
              <v-dialog
                v-model="dialog"
                max-width="900"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Neues Video
                    <v-icon
                      right
                    >
                      mdi-upload
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar
                    color="primary"
                    dark
                  >
                    <v-toolbar-title>
                      <v-icon>
                        mdi-upload
                      </v-icon>
                      Video Hochladen
                    </v-toolbar-title>
                  </v-toolbar>

                  <v-card-text>
                    <v-form
                      ref="form"
                      v-model="valid"
                      class="pa-1"
                      lazy-validation
                    >
                      <v-text-field
                        v-model="uploadItem.values.name"
                        class="pb-1"
                        type="text"
                        label="Name"
                        :rules="uploadItem.rules.name"
                      />
                      <v-text-field
                        v-model="uploadItem.values.orientation"
                        class="pb-1"
                        type="text"
                        label="Ausrichtung"
                        :rules="uploadItem.rules.orientation"
                      />
                      <v-radio-group
                        v-model="uploadItem.values.rotation"
                        row
                        mandatory
                      >
                        <v-radio
                          label="Ohne Rotation"
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
                      <v-text-field
                        v-model="uploadItem.values.width"
                        :rules="uploadItem.rules.width"
                        class="pb-1"
                        type="text"
                        label="Breite"
                        disabled
                      />
                      <v-text-field
                        v-model="uploadItem.values.height"
                        :rules="uploadItem.rules.height"
                        class="pb-1"
                        type="text"
                        label="Höhe"
                        disabled
                      />
                      <v-text-field
                        v-model="uploadItem.values.length"
                        class="pb-1"
                        type="text"
                        label="Länge (in Sekunden)"
                        disabled
                      />
                      <v-file-input
                        v-model="video"
                        :rules="videoRules"
                        show-size
                        label="Video"
                        accept="video/mp4"
                        placeholder="Wähle ein Video aus"
                        @change="inspectVideo"
                      />
                    </v-form>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="green darken-1"
                      text
                      @click="upload"
                    >
                      Speichern
                    </v-btn>
                    <v-btn
                      color="red darken-1"
                      text
                      @click="dialog = !dialog;resetUploadForm()"
                    >
                      Abbrechen
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.orientation_V2="{ item }">
            <v-icon left>
              mdi-cellphone {{ item.orientation_V2 === 'Hoch' ? '' : 'mdi-rotate-90' }}
            </v-icon>
            {{ item.orientation_V2 }}
          </template>
          <template v-slot:item.rotation="{ item }">
            <div
              v-if="item.rotation"
            >
              <v-icon left>
                mdi-phone-rotate-landscape {{ rotationClass(item) }}
              </v-icon>
              {{ item.rotation }}
            </div>
          </template>
          <template v-slot:item.updatedAt="{ item }">
            {{ formatTime(item.updatedAt, "DD.MM.YYYY kk:mm" ) }}
          </template>
          <template v-slot:item.size="{ item }">
            {{ bytesToSize(item.size) }}
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
                    <div v-if="action.action === 'download' || action.action === 'preview'">
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
                          v-for="(field, j) in editFields"
                          :key="j"
                          v-model="selectedItem[field.value]"
                          class="pb-1"
                          :type="field.type"
                          :label="field.name"
                          :rules="field.rules"
                        />
                        <v-btn
                          :disabled="!valid || loadingButton"
                          :loading="loadingButton"
                          color="success"
                          class="mr-4"
                          @click="sendEdit(item); dialog.value = false; resetValidation(action.action)"
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
                      <div class="text-h3 pa-3">
                        {{ action.text }}
                      </div>
                      <v-row
                        justify="center"
                        class="mx-3"
                      >
                        <v-col
                          cols="12"
                          md="6"
                        >
                          Left
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <v-sheet
                            color="grey darken-2"
                            rounded
                            class="hidden-sm-and-down"
                            style="max-height: 500px;overflow-y: scroll"
                          >
                            <v-expansion-panels
                              accordion
                            >
                              <v-expansion-panel
                                v-for="(item, i) in selectedItem.link"
                                :key="i"
                              >
                                <v-expansion-panel-header> {{ item.linkUUID }} </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                  <v-row
                                    v-for="(entry, j) in item"
                                    :key="j"
                                  >
                                    <v-col
                                      cols="6"
                                    >
                                      {{ entry }}
                                    </v-col>
                                    <v-col
                                      cols="6"
                                    >
                                      {{ item[entry] }}
                                    </v-col>
                                  </v-row>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                          </v-sheet>
                        </v-col>
                      </v-row>
                      <v-divider class="mx-3 mb-2 mt-4" />
                      <div class="mx-3 mb-2">
                        {{ action.info }}
                      </div>
                    </div>
                    <div v-else-if="action.action === 'info'">
                      <div class="text-h3 pa-3">
                        {{ action.text }}
                      </div>
                      <v-row
                        justify="center"
                        class="mx-3"
                      >
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <div
                            v-for="(item, i) in selectedItem"
                            :key="i"
                          >
                            <v-text-field
                              v-if="typeof item !== 'object'"
                              :label="i"
                              :value="item"
                            />
                          </div>
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <v-expansion-panels
                            accordion
                          >
                            <v-expansion-panel
                              v-for="(link,j) in selectedItem.link"
                              :key="j"
                              class="elevation-6"
                            >
                              <v-expansion-panel-header>
                                Item
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <div
                                  v-for="(entry, k) in link"
                                  :key="k"
                                >
                                  <v-text-field
                                    :label="k"
                                    :value="entry"
                                  />
                                </div>
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
  </v-container>
</template>

<script>
  import { sync } from 'vuex-pathify'
  import MaterialCard from '@/components/MaterialCard'
  import axios from 'axios'
  import _ from 'lodash'
  import { v4 as uuidv4 } from 'uuid'
  import moment from 'moment'
  export default {
    name: 'Videos',
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
      dialog: false,
      valid: true,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      loading: false,
      loadingButton: false,
      actions: [
        {
          color: 'success',
          icon: 'mdi-download',
          action: 'download',
          disabled: false,
          width: 600,
          title: 'Download',
          text: 'Der Download wurde gestartet.',
          info: 'Sollte kein Download starten, melden Sie sich bitte bei der IT.',
        },
        {
          color: '',
          icon: 'mdi-image-frame',
          action: 'preview',
          disabled: false,
          width: 600,
          title: 'Vorschau',
          text: 'Die Vorschau wurde in einem neuen Fenster geöffnet.',
          info: 'Sollte kein Video angezeigt werden, melden Sie sich bitte bei der IT.',
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
          color: 'black',
          icon: 'mdi-eye',
          action: 'info',
          disabled: true,
          width: null,
          title: 'Test',
          text: '',
          info: 'Dieser Bereich befindet sich noch in der Entwicklung.',
        },
        {
          color: 'blue',
          icon: 'mdi-pencil',
          action: 'edit',
          disabled: false,
          width: 600,
          title: 'Ändern',
          text: '',
          info: 'Das Feld "Rotation" ist noch etwas buggy. Soll das Feld leer sein, muss einmal was eingetragen und gelöscht werden.',
        },
        {
          color: 'error',
          icon: 'mdi-close',
          action: 'delete',
          disabled: false,
          width: 600,
          title: 'Löschen',
          text: 'Sind Sie sich sicher, dass dieses Video gelöscht werden soll ?',
          info: 'Gelöschte Videos sind nicht wiederherstellbar',
        },
      ],
      headers: [
        // {
        //   text: 'ID',
        //   value: 'id',
        // },
        // {
        //   text: 'KW',
        //   value: 'calendarWeek',
        // },
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
        {
          text: 'Größe',
          value: 'size',
          filterable: false,
        },
        {
          text: 'Letzte Änderung',
          value: 'updatedAt',
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
      editFields: [
        {
          name: 'Name',
          value: 'name',
          type: 'text',
          rules: [
            v => !!v || 'Name ist ein Pflichtfeld',
            v => (v && v.length > 4) || 'Der Name muss mindestens 5 Zeichen lang sein',
          ],
        },
        {
          name: 'Höhe',
          value: 'height',
          type: 'number',
          rules: [
            v => !!v || 'Höhe ist ein Pflichtfeld',
            v => /^\d{3,4}$/.test(v) || 'Die Höhe muss 3-4 stellig sein',
          ],
        },
        {
          name: 'Breite',
          value: 'width',
          type: 'number',
          rules: [
            v => !!v || 'Breite ist ein Pflichtfeld',
            v => /^\d{3,4}$/.test(v) || 'Die Breite muss 3-4 stellig sein',
          ],
        },
        {
          name: 'Ausrichtung',
          value: 'orientation_V2',
          type: 'text',
          rules: [
            v => /^(?=[\s\S])/.test(v) ? /^(hoch|breit)$/i.test(v) || 'Hoch oder Breit' : true,
          ],
        },
        {
          name: 'Rotation',
          value: 'rotation',
          type: 'text',
          rules: [
            v => /^(?=[\s\S])/.test(v) ? /^(rechts|links)$/i.test(v) || 'Rechts oder Links' : true,
          ],
        },
      ],
      uploadItem: {
        rules: {
          name: [
            v => !!v || 'Name ist ein Pflichtfeld',
            v => (v && v.length > 4) || 'Der Name muss mindestens 5 Zeichen lang sein',
          ],
          orientation: [
            v => !v || /^(hoch|breit)$/i.test(v) || 'Hoch oder Breit',
          ],
          height: [
            v => !!v || 'Höhe ist ein Pflichtfeld',
            v => /^\d{3,4}$/.test(v) || 'Die Höhe muss 3-4 stellig sein',
          ],
          width: [
            v => !!v || 'Breite ist ein Pflichtfeld',
            v => /^\d{3,4}$/.test(v) || 'Die Breite muss 3-4 stellig sein',
          ],
        },
        values: {
          name: null,
          orientation: null,
          rotation: null,
          width: null,
          height: null,
          length: null,
        },
      },
      selectedItem: {},
      videoRules: [
        v => !!v || 'Das Video ist ein Pflichtfeld',
      ],
      video: null,
      search: null,
    }),
    computed: {
      ...sync('app', [
        'videos',
      ]),
    },
    methods: {
      rotationClass: function (item) {
        if (item.orientation_V2 === 'Breit' && item.rotation === 'Rechts') return 'mdi-rotate-270'
        if (item.orientation_V2 === 'Hoch' && item.rotation === 'Links') return 'mdi-flip-h'
      },
      formatTime: function (time, format) {
        return moment(time).format(format)
      },
      bytesToSize: function (bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return '0 Byte'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
      },
      /**
       * Link Object retrieved from the API
       * @typedef {Object} Link
       * @property {Number} id - id
       * @property {String} linkUUID - Unique identifier for the Link
       * @property {String} deviceUUID - Unique identifier for the Device
       * @property {String} videoUUID - Unique identifier for the Video
       * @property {String} name - Name of the Link (optional)
       * @property {String} start - Start time as Unix Timestamp (Format: Milliseconds)
       * @property {String} end - End time as Unix Timestamp (Format: Milliseconds)
       * @property {Boolean} active - Is Video visible or not
       * @property {Number} position - Position of the Video
       * @property {String} createdAt - Entry created at date (Format: "YYYY-MM-DDTHH:mm:SS.000Z" Example: "2021-05-17T13:05:14.000Z")
       * @property {String} updatedAt - Entry updated at date (Format: "YYYY-MM-DDTHH:mm:SS.000Z" Example: "2021-05-17T13:05:14.000Z"))
       */
      /**
       * Video Object retrieved from the API
       * @typedef {Object} Video
       * @property {Number} id - id
       * @property {String} videoUUID - Unique identifier
       * @property {String} name - Name
       * @property {String} path - Path on Server
       * @property {Number} size - File size
       * @property {Number} width - Width
       * @property {Number} height - Height
       * @property {String} md5 - MD5 hash
       * @property {String} calendarWeek - Calendar Week (optional)
       * @property {String} orientation_V2 - Orientation (optional)
       * @property {String} rotation - Rotation (optional)
       * @property {String} createdAt - Entry created at date (Format: "YYYY-MM-DDTHH:mm:SS.000Z" Example: "2021-05-17T13:05:14.000Z")
       * @property {String} updatedAt - Entry updated at date (Format: "YYYY-MM-DDTHH:mm:SS.000Z" Example: "2021-05-17T13:05:14.000Z"))
       * @property {Array} link - Array of {@link Link} objects
       */
      /**
       * Action for the Video Data Table
       * @typedef {Object} Action
       * @property {String} color - Color for the action icon
       * @property {String} icon - Material Design Icon (Format: mdi-...)
       * @property {String} action - Action identifier
       * @property {String} title - Displayname
       * @property {String} text - Textbox content
       * @property {String} info - Additional Information
       */
      /**
       * Calls the given function and passes it the {@link Video} object
       * @param {Action} action - Action Object
       * @param {Video} item - Video Object
       */
      actionHandle: function (action, item) {
        this[action.action](item)
      },
      /**
       * Link Object retrieved from the API
       * @typedef {Object} Link
       * @property {Number} id - id
       * @property {String} linkUUID - Unique identifier for the Link
       * @property {String} deviceUUID - Unique identifier for the Device
       * @property {String} videoUUID - Unique identifier for the Video
       * @property {String} name - Name of the Link (optional)
       * @property {String} start - Start time as Unix Timestamp (Format: Milliseconds)
       * @property {String} end - End time as Unix Timestamp (Format: Milliseconds)
       * @property {Boolean} active - Is Video visible or not
       * @property {Number} position - Position of the Video
       * @property {String} createdAt - Entry created at date (Format: "YYYY-MM-DDTHH:mm:SS.000Z" Example: "2021-05-17T13:05:14.000Z")
       * @property {String} updatedAt - Entry updated at date (Format: "YYYY-MM-DDTHH:mm:SS.000Z" Example: "2021-05-17T13:05:14.000Z"))
       */
      /**
       * Video Object retrieved from the API
       * @typedef {Object} Video
       * @property {Number} id - id
       * @property {String} videoUUID - Unique identifier
       * @property {String} name - Name
       * @property {String} path - Path on Server
       * @property {Number} size - File size
       * @property {Number} width - Width
       * @property {Number} height - Height
       * @property {String} md5 - MD5 hash
       * @property {String} calendarWeek - Calendar Week (optional)
       * @property {String} orientation_V2 - Orientation (optional)
       * @property {String} rotation - Rotation (optional)
       * @property {String} createdAt - Entry created at date (Format: "YYYY-MM-DDTHH:mm:SS.000Z" Example: "2021-05-17T13:05:14.000Z")
       * @property {String} updatedAt - Entry updated at date (Format: "YYYY-MM-DDTHH:mm:SS.000Z" Example: "2021-05-17T13:05:14.000Z"))
       * @property {Array} link - Array of {@link Link} objects
       */
      /**
       * @param {Video} item - Video Object
       */
      download: function (item) {
        axios.get(`http://kodizabbix:3333/v2/video/file/${item.videoUUID}`, { responseType: 'blob' })
          .then(resp => {
            if (resp.data.type !== 'video/mp4') return
            const url = window.URL.createObjectURL(resp.data)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = item.name
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
          })
          .catch((error) => {
            this.alert = {
              value: true,
              type: 'error',
              text: error.response.status === 404 ? 'Es konnte kein Video gefunden werden' : error.response.data.message,
            }
          })
      },
      /**
       * Link Object retrieved from the API
       * @typedef {Object} Link
       * @property {Number} id - id
       * @property {String} linkUUID - Unique identifier for the Link
       * @property {String} deviceUUID - Unique identifier for the Device
       * @property {String} videoUUID - Unique identifier for the Video
       * @property {String} name - Name of the Link (optional)
       * @property {String} start - Start time as Unix Timestamp (Format: Milliseconds)
       * @property {String} end - End time as Unix Timestamp (Format: Milliseconds)
       * @property {Boolean} active - Is Video visible or not
       * @property {Number} position - Position of the Video
       * @property {String} createdAt - Entry created at date (Format: "YYYY-MM-DDTHH:mm:SS.000Z" Example: "2021-05-17T13:05:14.000Z")
       * @property {String} updatedAt - Entry updated at date (Format: "YYYY-MM-DDTHH:mm:SS.000Z" Example: "2021-05-17T13:05:14.000Z"))
       */
      /**
       * Video Object retrieved from the API
       * @typedef {Object} Video
       * @property {Number} id - id
       * @property {String} videoUUID - Unique identifier
       * @property {String} name - Name
       * @property {String} path - Path on Server
       * @property {Number} size - File size
       * @property {Number} width - Width
       * @property {Number} height - Height
       * @property {String} md5 - MD5 hash
       * @property {String} calendarWeek - Calendar Week (optional)
       * @property {String} orientation_V2 - Orientation (optional)
       * @property {String} rotation - Rotation (optional)
       * @property {String} createdAt - Entry created at date (Format: "YYYY-MM-DDTHH:mm:SS.000Z" Example: "2021-05-17T13:05:14.000Z")
       * @property {String} updatedAt - Entry updated at date (Format: "YYYY-MM-DDTHH:mm:SS.000Z" Example: "2021-05-17T13:05:14.000Z"))
       * @property {Array} link - Array of {@link Link} objects
       */
      /**
       * @param {Video} item - Video Object
       */
      preview: function (item) {
        axios.get(`http://kodizabbix:3333/v2/video/file/${item.videoUUID}`)
          .then(response => {
            if (response.status === 200) {
              window.open(`http://kodizabbix:3333/v2/video/file/${item.videoUUID}`, 's', `width= ${item.height > item.width ? '576' : '1024'}, height= ${item.height > item.width ? '1024' : '576'}, left=150, top=10, resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, copyhistory=no`)
            }
          })
          .catch((error) => {
            this.alert = {
              value: true,
              type: 'error',
              text: error.response.status === 404 ? 'Es konnte kein Video gefunden werden' : error.response.data.message,
            }
          })
      },
      link: function (item) {
        // todo: add link dialog
        this.selectedItem = Object.assign(this.selectedItem, item)
      },
      info: function (item) {
        // todo: add info stuff
        this.selectedItem = Object.assign(this.selectedItem, item)
      },
      edit: function (item) {
        this.selectedItem = Object.assign(this.selectedItem, item)
      },
      sendEdit: function (item) {
        if (this.validate()) {
          this.loadingButton = true
          axios.put('http://kodizabbix:3333/v2/video',
                    _.pick(this.selectedItem, 'videoUUID', 'name', 'calendarWeek', 'orientation_V2', 'rotation'),
          ).then((response) => {
            Object.assign(item, this.selectedItem)
            this.loadingButton = false
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
        axios.delete(`http://kodizabbix:3333/v2/video/${this.selectedItem.videoUUID}`)
          .then((response) => {
            const itemPos = this.videos.map(function (x) { return x.id }).indexOf(this.selectedItem.id)
            this.videos.splice(itemPos, 1)
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
        if (this.$refs.form[0]) { return this.$refs.form[0].validate() } else { return this.$refs.form.validate() }
      },
      resetValidation: function (action) {
        if (action === 'edit') { this.$refs.form[0].resetValidation() }
        if (action === 'upload') { this.$refs.form.resetValidation() }
      },
      resetUploadForm: function () {
        this.resetValidation('upload')
        this.video = null
        for (const key in this.uploadItem.values) {
          this.uploadItem.values[key] = null
        }
      },
      inspectVideo: function () {
        const vid = document.createElement('video')
        vid.src = URL.createObjectURL(this.video)
        vid.addEventListener('loadedmetadata', e => {
          this.uploadItem.values.name = this.video.name.replace(/.mp4$/, '')
          this.uploadItem.values.height = e.path[0].videoHeight
          this.uploadItem.values.width = e.path[0].videoWidth
          this.uploadItem.values.length = e.path[0].duration
          this.uploadItem.values.orientation = e.path[0].videoWidth > e.path[0].videoHeight ? 'Breit' : 'Hoch'
        })
      },
      upload: function () {
        if (this.validate()) {
          // todo: add upload
          console.log(this.uploadItem.values)
          const postData = new FormData()
          postData.append('videoUUID', uuidv4())
          postData.append('name', this.uploadItem.values.name)
          postData.append('width', this.uploadItem.values.width)
          postData.append('height', this.uploadItem.values.height)
          postData.append('orientation', this.uploadItem.values.orientation)
          if (this.uploadItem.values.rotation !== 0) {
            postData.append('rotation', this.uploadItem.values.rotation)
          }
          postData.append('uploadedFile', this.video)
          axios.post('http://kodizabbix:3333/v2/video', postData).then(response => {
            console.log(this.videos)
            this.alert = {
              value: true,
              type: 'success',
              text: response.data.message,
            }
            console.log(response)
          }).catch(error => {
            this.alert = {
              value: true,
              type: 'error',
              text: error.response.data.message,
            }
          }).finally(() => {
            this.resetUploadForm()
          })
        }
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
