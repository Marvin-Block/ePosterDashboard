<template>
  <v-container
    id="data-tables-view"
    fluid
    tag="section"
  >
    <view-intro
      heading="In Entwicklung"
      style="margin-top: -70px"
    />

    <v-card
      max-height="85vh"
      class="overflow-y-scroll"
    >
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
              <v-card
                hover
                height="50%"
                width="50%"
                class="d-flex justify-space-around align-center"
                @click="addPlaylist"
              >
                <v-icon
                  x-large
                  color="success"
                >
                  mdi-plus-circle-outline
                </v-icon>
              </v-card>
            </v-card>
          </v-col>
          <v-col
            v-for="playlist in playlists"
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
                {{ playlist.playlistLinks.length }} Videos
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
                        {{ playlist.playlistLinks }}
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
  </v-container>
</template>

<script>
  import ViewIntro from '@/components/ViewIntro'
  export default {
    name: 'Playlist',
    components: { ViewIntro },
    data: () => ({
      playlists: [
        {
          playlistUUID: 'fc24ed1b-1396-42e6-b527-80d17af33bdc',
          name: 'Test Playlist 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet neque id nulla rutrum, at posuere erat venenatis. Suspendisse potenti. Duis nisl arcu, dapibus id sodales et, porttitor non mauris. Integer ultricies ante nunc, id malesuada odio lobortis porta. Pellentesque quis euismod nulla, et consectetur enim. Phasellus lectus velit, interdum tempor vestibulum imperdiet, ornare sed urna. Quisque ac purus mattis, consectetur lectus et, interdum lacus. Maecenas eu turpis tortor. Aenean sed ante nisl. Cras est quam, imperdiet ac rutrum sed, feugiat eu dui. Donec rutrum libero tortor, sed tempus tellus elementum vel. Fusce ullamcorper turpis id tristique consectetur. Nulla tempus nec dolor eu iaculis.',
          playlistLinks: [
            {
              videoUUID: 'e3d08d01-3c4b-409f-99a1-d646425957f0',
              name: 'Hans1', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
            {
              videoUUID: '0bae58ab-e303-435e-8719-af22b9b5cff5',
              name: 'Hans2', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
            {
              videoUUID: 'aeda186d-8b6b-41fc-9f65-df4156ca2bc1',
              name: 'Hans3', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
          ],
        },
        {
          playlistUUID: '9cd94ca1-1ec8-496c-8f71-0f3901a5589d',
          name: 'Test Playlist 2',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet neque id nulla rutrum, at posuere erat venenatis. Suspendisse potenti. Duis nisl arcu, dapibus id sodales et, porttitor non mauris. Integer ultricies ante nunc, id malesuada odio lobortis porta. Pellentesque quis euismod nulla, et consectetur enim. Phasellus lectus velit, interdum tempor vestibulum imperdiet, ornare sed urna. Quisque ac purus mattis, consectetur lectus et, interdum lacus. Maecenas eu turpis tortor. Aenean sed ante nisl. Cras est quam, imperdiet ac rutrum sed, feugiat eu dui. Donec rutrum libero tortor, sed tempus tellus elementum vel. Fusce ullamcorper turpis id tristique consectetur. Nulla tempus nec dolor eu iaculis.',
          playlistLinks: [
            {
              videoUUID: 'e3d08d01-3c4b-409f-99a1-d646425957f0',
              name: 'Hans1', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
            {
              videoUUID: '0bae58ab-e303-435e-8719-af22b9b5cff5',
              name: 'Hans2', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
            {
              videoUUID: 'aeda186d-8b6b-41fc-9f65-df4156ca2bc1',
              name: 'Hans3', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
          ],
        },
        {
          playlistUUID: '02cbcdbc-ecf2-4ff6-ab44-30b57aa33073',
          name: 'Test Playlist 3',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet neque id nulla rutrum, at posuere erat venenatis. Suspendisse potenti. Duis nisl arcu, dapibus id sodales et, porttitor non mauris. Integer ultricies ante nunc, id malesuada odio lobortis porta. Pellentesque quis euismod nulla, et consectetur enim. Phasellus lectus velit, interdum tempor vestibulum imperdiet, ornare sed urna. Quisque ac purus mattis, consectetur lectus et, interdum lacus. Maecenas eu turpis tortor. Aenean sed ante nisl. Cras est quam, imperdiet ac rutrum sed, feugiat eu dui. Donec rutrum libero tortor, sed tempus tellus elementum vel. Fusce ullamcorper turpis id tristique consectetur. Nulla tempus nec dolor eu iaculis.',
          playlistLinks: [
            {
              videoUUID: 'e3d08d01-3c4b-409f-99a1-d646425957f0',
              name: 'Hans1', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
            {
              videoUUID: '0bae58ab-e303-435e-8719-af22b9b5cff5',
              name: 'Hans2', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
            {
              videoUUID: 'aeda186d-8b6b-41fc-9f65-df4156ca2bc1',
              name: 'Hans3', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
          ],
        },
        {
          playlistUUID: '02cbcdbc-ecf2-4ff6-ab44-30b57aa33073',
          name: 'Test Playlist 4',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet neque id nulla rutrum, at posuere erat venenatis. Suspendisse potenti. Duis nisl arcu, dapibus id sodales et, porttitor non mauris. Integer ultricies ante nunc, id malesuada odio lobortis porta. Pellentesque quis euismod nulla, et consectetur enim. Phasellus lectus velit, interdum tempor vestibulum imperdiet, ornare sed urna. Quisque ac purus mattis, consectetur lectus et, interdum lacus. Maecenas eu turpis tortor. Aenean sed ante nisl. Cras est quam, imperdiet ac rutrum sed, feugiat eu dui. Donec rutrum libero tortor, sed tempus tellus elementum vel. Fusce ullamcorper turpis id tristique consectetur. Nulla tempus nec dolor eu iaculis.',
          playlistLinks: [
            {
              videoUUID: 'e3d08d01-3c4b-409f-99a1-d646425957f0',
              name: 'Hans1', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
            {
              videoUUID: '0bae58ab-e303-435e-8719-af22b9b5cff5',
              name: 'Hans2', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
            {
              videoUUID: 'aeda186d-8b6b-41fc-9f65-df4156ca2bc1',
              name: 'Hans3', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
            {
              videoUUID: '84a5b512-d085-4194-8c6e-96696cfc206e',
              name: 'Hans4', // for dev purpose
              start: '1622498400000',
              end: '1640991540000',
              active: 1,
              position: 999,
            },
          ],
        },
      ],
    }),
    methods: {
      addPlaylist (e) {
        this.$store.dispatch('app/updatePlaylists', this.playlists)
        console.log(e)
      },
    },
  }
</script>
