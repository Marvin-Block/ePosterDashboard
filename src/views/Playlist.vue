<template>
  <v-container
    id="data-tables-view"
    fluid
    tag="section"
  >
    <view-intro
      heading="Dieser Bereich ist noch in der Entwicklung"
      style="margin-top: -70px"
    />

    <v-card
      max-height="85vh"
      class="overflow-y-scroll"
    >
      <v-toolbar flat>
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
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            md="3"
          >
            <v-card
              height="300px"
              flat
              class="d-flex justify-space-around align-center"
            >
              <v-dialog
                transition="dialog-bottom-transition"
                max-width="800"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-card
                    v-bind="attrs"
                    outlined
                    hover
                    height="50%"
                    width="50%"
                    class="d-flex justify-space-around align-center"
                    v-on="on"
                  >
                    <v-icon
                      x-large
                      color="success"
                    >
                      mdi-plus-circle-outline
                    </v-icon>
                  </v-card>
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-overlay
                      :value="loader"
                      absolute
                    >
                      <v-progress-circular
                        indeterminate
                        size="128"
                      />
                    </v-overlay>
                    <v-toolbar
                      color="green"
                      dark
                    >
                      <v-toolbar-title>
                        <v-icon>
                          mdi-folder-plus
                        </v-icon>
                        Neue Playlist
                      </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-form
                        ref="form"
                        v-model="valid"
                        class="pa-3"
                        lazy-validation
                      >
                        <v-row>
                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-text-field
                              v-model="newPlaylist.name"
                              class="pb-1"
                              type="text"
                              label="Name"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-text-field
                              v-model="newPlaylist.category"
                              class="pb-1"
                              type="text"
                              label="Kategorie"
                            />
                          </v-col>
                        </v-row>
                        <v-textarea
                          v-model="newPlaylist.description"
                          class="pb-1"
                          type="text"
                          label="Beschreibung"
                        />
                        <v-btn
                          :disabled="!valid || loader"
                          :loading="loader"
                          color="success"
                          class="mr-4"
                          @click="addPlaylist(dialog);"
                        >
                          Speichern
                        </v-btn>
                      </v-form>
                      <v-divider class="mx-3 mb-2 mt-8" />
                      <div class="mx-3 mb-2">
                        PlaylistUUID: {{ newPlaylist.playlistUUID }}
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn
                        text
                        @click="dialog.value = false"
                      >
                        Schließen
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-card>
          </v-col>
          <v-col
            v-for="playlist in filter"
            :key="playlist.playlistUUID"
            cols="12"
            md="3"
          >
            <v-card
              elevation="4"
            >
              <div class="d-flex justify-space-around align-center">
                <v-img
                  v-if="playlist.img"
                  :src="playlist.img"
                  :alt="playlist.name.substr(0,1)"
                  class="white--text align-end"
                  height="200px"
                />
                <v-avatar
                  v-else
                  tile
                  color="grey lighten-2"
                  height="200px"
                  width="100%"
                >
                  <span class="black--text text-h2">{{ playlist.name.substr(0,2) }}</span>
                </v-avatar>
              </div>
              <v-card-text class="d-flex justify-space-between black--text">
                {{ playlist.name }}
                <v-spacer />
                {{ playlist.videos.length }} Videos
              </v-card-text>
              <v-card-actions
                class="align-center justify-end"
              >
                <v-dialog
                  transition="dialog-bottom-transition"
                  max-width="800"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>
                        mdi-playlist-edit
                      </v-icon>
                    </v-btn>
                  </template>
                  <template
                    v-slot:default="dialog"
                  >
                    <v-card>
                      <v-toolbar
                        light
                        flat
                      >
                        <v-toolbar-title>
                          <v-icon>
                            mdi-folder
                          </v-icon>
                          {{ playlist.name }}
                        </v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                        {{ playlist.videos }}
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn
                          text
                          @click="dialog.value = false;"
                        >
                          Schließen
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
                <v-btn
                  icon
                >
                  <v-icon
                    color="success"
                  >
                    mdi-playlist-plus
                  </v-icon>
                </v-btn>
                <v-btn
                  style="margin: 0 !important;"
                  icon
                  @click="removePlaylist(playlist.playlistUUID)"
                >
                  <v-icon
                    color="error"
                  >
                    mdi-playlist-remove
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
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
  import { v4 as uuidv4 } from 'uuid'
  import Socket from '@/plugins/socket'
  import axios from 'axios'
  import { sync } from 'vuex-pathify'
  export default {
    name: 'Playlist',
    data: () => ({
      search: '',
      loader: false,
      alert: {
        value: false,
        type: 'error',
        text: 'Oopsie.. :('
      },
      newPlaylist: {
        playlistUUID: null,
        name: null,
        category: null,
        video: []
      },
      valid: true
    }),
    computed: {
      ...sync('app', [
        'playlists'
      ]),
      filter () {
        return this.playlists.filter(item => {
          return item.name.toLowerCase().startsWith(this.search.toLowerCase())
        })
      }
    },
    beforeMount () {
      Socket.send('playlist')
      this.newPlaylist.playlistUUID = uuidv4()
    },
    methods: {
      addPlaylist (dialog) {
        this.loader = true
        const postData = new FormData()
        postData.append('playlistUUID', this.newPlaylist.playlistUUID)
        postData.append('name', this.newPlaylist.name)
        postData.append('category', this.newPlaylist.category)
        postData.append('description', this.newPlaylist.description)
        axios.post('http://kodizabbix:3333/v2/playlist', postData).then(response => {
          this.loader = false
          this.alert = {
            value: true,
            type: 'success',
            text: response.data.message
          }
          Socket.send('playlist')
          dialog.value = false
          this.newPlaylist = {
            playlistUUID: uuidv4(),
            name: null,
            category: null,
            video: []
          }
        }).catch(error => {
          this.loader = false
          this.alert = {
            value: true,
            type: 'error',
            text: error.response.data.message
          }
        })
      },
      removePlaylist (uuid) {
        this.loader = true
        axios.delete(`http://kodizabbix:3333/v2/playlist/${uuid}`)
          .then((response) => {
            this.playlists = this.playlists.filter(playlist => { return playlist.playlistUUID !== uuid })
            this.loader = false
            this.alert = {
              value: true,
              type: 'success',
              text: response.data.message
            }
          })
          .catch(error => {
            this.loader = false
            console.log(error)
            this.alert = {
              value: true,
              type: 'error',
              text: error.response.data.message
            }
          })
      }
    }
  }
</script>
