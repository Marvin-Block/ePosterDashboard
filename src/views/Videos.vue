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
          :items="this.videos"
          :search.sync="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-0"
          multi-sort
          no-results-text="Es wurde leider nichts gefunden"
          no-data-text="Es scheint keine Videos zu geben"
          loading-text="Videos werden geladen..."
          :loading="this.videos.length < 1"
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
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
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
                    Video Hochladen
                  </v-toolbar>

                  <v-card-text>
                    <v-form
                      ref="form"
                      v-model="valid"
                      class="pa-1"
                      lazy-validation
                    >
                      <v-text-field
                        v-for="(field, i) in newItem"
                        :key="i"
                        v-model="field.data"
                        class="pb-1"
                        :type="field.type"
                        :label="field.name"
                        :disabled="field.disabled"
                        :rules="field.rules"
                      >
                      </v-text-field>
                      <v-file-input
                        :rules="videoRules"
                        v-model="video"
                        show-size
                        label="Video"
                        accept="video/mp4"
                        placeholder="Wähle ein Video aus"
                        @change="inspectVideo"
                      >
                      </v-file-input>
                    </v-form>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
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
                      @click="dialog = !dialog"
                    >
                      Abbrechen
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.updatedAt="{ item }">
            <p>{{ formatTime(item.updatedAt, "DD.MM.YYYY kk:mm" ) }}</p>
          </template>
          <template v-slot:item.size="{ item }">
            <p>{{ bytesToSize(item.size) }}</p>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-dialog
              v-for="(action, i) in actions"
              :key="i"
              transition="dialog-bottom-transition"
              max-width="600"
            >
              <template v-slot:activator="{ on, attrs }">
                <app-btn
                  v-bind="attrs"
                  :color="action.color"
                  class="px-2 ml-1"
                  elevation="0"
                  min-width="0"
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
                    color="primary"
                    dark
                  >
                    {{ action.title }}
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
                          v-model="item[field.value]"
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
                          @click="sendEdit"
                        >
                          Speichern
                        </v-btn>
                      </v-form>
                      <v-divider class="mx-3 mb-2 mt-8" />
                      <div class="mx-3 mb-2">
                        {{ action.info }}
                      </div>
                    </div>
                    <div v-else>
                      <div class="text-h3 pa-3">
                        {{ action.text }}
                      </div>
                      <v-btn
                        block
                        color="error"
                        @click="sendDelete"
                      >
                        Löschen
                      </v-btn>
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
          title: 'Download',
          text: 'Der Download wurde gestartet.',
          info: 'Sollte kein Download starten, melden Sie sich bitte bei der IT.',
        },
        {
          color: '',
          icon: 'mdi-image-frame',
          action: 'preview',
          title: 'Vorschau',
          text: 'Die Vorschau wurde in einem neuen Fenster geöffnet.',
          info: 'Sollte kein Video angezeigt werden, melden Sie sich bitte bei der IT.',
        },
        {
          color: 'info',
          icon: 'mdi-pencil',
          action: 'edit',
          title: 'Ändern',
          text: '',
          info: 'Das Feld "Rotation" ist noch etwas buggy. Soll das Feld leer sein, muss einmal was eingetragen und gelöscht werden.',
        },
        {
          color: 'error',
          icon: 'mdi-close',
          action: 'delete',
          title: 'Löschen',
          text: 'Sind Sie sich sicher, dass dieses Video gelöscht werden soll ?',
          info: 'Gelöschte Videos sind nicht wiederherstellbar',
        },
      ],
      headers: [
        {
          text: 'ID',
          value: 'id',
        },
        {
          text: 'KW',
          value: 'calendarWeek',
        },
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
        },
        {
          text: 'Letzte Änderung',
          value: 'updatedAt',
        },
        {
          text: 'Verlinkungen',
          value: 'link.length',
        },
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
          name: 'Kalenderwoche',
          value: 'calendarWeek',
          type: 'text',
          rules: [
            v => /^(?=[\s\S])/.test(v) ? /^KW\d{2}$/.test(v) || 'Format KW00, KW99, etc' : true,
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
      newItem: [
        {
          name: 'Name',
          value: 'name',
          data: null,
          disabled: false,
          type: 'text',
          rules: [
            v => !!v || 'Name ist ein Pflichtfeld',
            v => (v && v.length > 4) || 'Der Name muss mindestens 5 Zeichen lang sein',
          ],
        },
        {
          name: 'Kalenderwoche',
          value: 'calendarWeek',
          data: null,
          disabled: false,
          type: 'text',
          rules: [
            v => !v || /^KW\d{2}$/.test(v) || 'Format KW00, KW99, etc',
          ],
        },
        {
          name: 'Ausrichtung',
          value: 'orientation_V2',
          data: null,
          disabled: false,
          type: 'text',
          rules: [
            v => !v || /^(hoch|breit)$/i.test(v) || 'Hoch oder Breit',
          ],
        },
        {
          name: 'Rotation',
          value: 'rotation',
          data: null,
          disabled: false,
          type: 'text',
          rules: [
            v => !v || /^(rechts|links)$/i.test(v) || 'Rechts oder Links',
          ],
        },
        {
          name: 'Höhe',
          value: 'height',
          data: null,
          disabled: true,
          type: 'number',
          rules: [
            v => !!v || 'Höhe ist ein Pflichtfeld',
            v => /^\d{3,4}$/.test(v) || 'Die Höhe muss 3-4 stellig sein',
          ],
        },
        {
          name: 'Breite',
          value: 'width',
          data: null,
          disabled: true,
          type: 'number',
          rules: [
            v => !!v || 'Breite ist ein Pflichtfeld',
            v => /^\d{3,4}$/.test(v) || 'Die Breite muss 3-4 stellig sein',
          ],
        },
        {
          name: 'Länge (in Sek.)',
          value: 'length',
          data: null,
          disabled: true,
          type: 'number',
          rules: [],
        },
      ],
      selectedItem: {},
      videoRules: [
        v => !!v || 'Das Video ist ein Pflichtfeld'
      ],
      video: null,
      search: undefined,
    }),
    computed: {
      ...sync('app', [
        'videos',
      ]),
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
      actionHandle: function (action, item) {
        this[action.action](item)
      },
      download: function (item) {
        axios.get(`http://kodizabbix:3330/v2/video/file/${item.videoUUID}`, { responseType: 'blob' })
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
      preview: function (item) {
        axios.get(`http://kodizabbix:3330/v2/video/file/${item.videoUUID}`)
          .then(response => {
            window.open(`http://kodizabbix:3330/v2/video/file/${item.videoUUID}`, 's', `width= ${item.height > item.width ? '576' : '1024'}, height= ${item.height > item.width ? '1024' : '576'}, left=150, top=10, resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, copyhistory=no`)
          })
          .catch((error) => {
            this.alert = {
              value: true,
              type: 'error',
              text: error.response.status === 404 ? 'Es konnte kein Video gefunden werden' : error.response.data.message,
            }
          })
      },
      edit: function (item) {
        this.selectedItem = item
      },
      sendEdit: function () {
        if (this.validate()) {
          this.loadingButton = true
          axios.put('http://kodizabbix:3330/v2/video',
                    _.pick(this.selectedItem, 'videoUUID', 'name', 'calendarWeek', 'orientation_V2', 'rotation'),
          ).then((response) => {
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
        axios.delete(`http://kodizabbix:3330/v2/video/${this.selectedItem.videoUUID}`)
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
        if (this.$refs.form[0])
          return this.$refs.form[0].validate()
        else
          return this.$refs.form.validate()
      },
      resetValidation: function (action) {
        if (action === 'edit') { this.$refs.form[0].resetValidation() }
      },
      inspectVideo: function () {
        let vid = document.createElement("video");
        vid.src = URL.createObjectURL(this.video);
        vid.addEventListener("loadedmetadata", e => {
          this.newItem[4].data = e.path[0].videoHeight
          this.newItem[5].data = e.path[0].videoWidth
          this.newItem[6].data = e.path[0].duration
          this.newItem[2].data = e.path[0].videoWidth > e.path[0].videoHeight ? 'Breit' : 'Hoch'
        });
      },
      upload: function () {
        if (this.validate()) {
          // todo: add upload
          let a = {}
          this.newItem.forEach(entry => {
            console.log(entry.name, entry.data)
          })
        }
      }
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
