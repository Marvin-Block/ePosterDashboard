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
          @contextmenu:row="show"
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
                  <v-overlay
                    :value="loader"
                    class="d-flex flex-column justify-center"
                    absolute
                  >
                    <div
                      class="d-flex flex-column justify-center"
                    >
                      <v-progress-circular
                        :value="uploadProgress"
                        rotate="90"
                        size="256"
                        width="40"
                        color="green lighten-1"
                      >
                        <span class="white--text text-h3">{{ uploadProgress }}%</span>
                      </v-progress-circular>
                      <br>
                      <br>
                      <span class="white--text text-center text-h4 d-flex align-center">
                        {{ uploadText }}
                        <div
                          v-if="uploadText !== 'Die Datei wird Hochgeladen'"
                          id="cogs"
                          class="ml-1"
                        >
                          <svg
                            id="bigCog"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="25px"
                            height="25px"
                            viewBox="0 0 25 25.001"
                            fill="white"
                          >
                            <g>
                              <path d="M24.38,10.175l-2.231-0.268c-0.228-0.851-0.562-1.655-0.992-2.401l1.387-1.763c0.212-0.271,0.188-0.69-0.057-0.934l-2.299-2.3c-0.242-0.243-0.662-0.269-0.934-0.057l-1.766,1.389c-0.743-0.43-1.547-0.764-2.396-0.99L14.825,0.62C14.784,0.279,14.469,0,14.125,0h-3.252c-0.344,0-0.659,0.279-0.699,0.62L9.906,2.851c-0.85,0.227-1.655,0.562-2.398,0.991L5.743,2.455c-0.27-0.212-0.69-0.187-0.933,0.056L2.51,4.812C2.268,5.054,2.243,5.474,2.456,5.746L3.842,7.51c-0.43,0.744-0.764,1.549-0.991,2.4l-2.23,0.267C0.28,10.217,0,10.532,0,10.877v3.252c0,0.344,0.279,0.657,0.621,0.699l2.231,0.268c0.228,0.848,0.561,1.652,0.991,2.396l-1.386,1.766c-0.211,0.271-0.187,0.69,0.057,0.934l2.296,2.301c0.243,0.242,0.663,0.269,0.933,0.057l1.766-1.39c0.744,0.43,1.548,0.765,2.398,0.991l0.268,2.23c0.041,0.342,0.355,0.62,0.699,0.62h3.252c0.345,0,0.659-0.278,0.699-0.62l0.268-2.23c0.851-0.228,1.655-0.562,2.398-0.991l1.766,1.387c0.271,0.212,0.69,0.187,0.933-0.056l2.299-2.301c0.244-0.242,0.269-0.662,0.056-0.935l-1.388-1.764c0.431-0.744,0.764-1.548,0.992-2.397l2.23-0.268C24.721,14.785,25,14.473,25,14.127v-3.252C25.001,10.529,24.723,10.216,24.38,10.175z M12.501,18.75c-3.452,0-6.25-2.798-6.25-6.25s2.798-6.25,6.25-6.25s6.25,2.798,6.25,6.25S15.954,18.75,12.501,18.75z" />
                            </g>
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                          </svg>
                          <svg
                            id="smallCog"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="25px"
                            height="25px"
                            viewBox="0 0 25 25.001"
                            fill="white"
                          >
                            <g>
                              <path d="M24.38,10.175l-2.231-0.268c-0.228-0.851-0.562-1.655-0.992-2.401l1.387-1.763c0.212-0.271,0.188-0.69-0.057-0.934l-2.299-2.3c-0.242-0.243-0.662-0.269-0.934-0.057l-1.766,1.389c-0.743-0.43-1.547-0.764-2.396-0.99L14.825,0.62C14.784,0.279,14.469,0,14.125,0h-3.252c-0.344,0-0.659,0.279-0.699,0.62L9.906,2.851c-0.85,0.227-1.655,0.562-2.398,0.991L5.743,2.455c-0.27-0.212-0.69-0.187-0.933,0.056L2.51,4.812C2.268,5.054,2.243,5.474,2.456,5.746L3.842,7.51c-0.43,0.744-0.764,1.549-0.991,2.4l-2.23,0.267C0.28,10.217,0,10.532,0,10.877v3.252c0,0.344,0.279,0.657,0.621,0.699l2.231,0.268c0.228,0.848,0.561,1.652,0.991,2.396l-1.386,1.766c-0.211,0.271-0.187,0.69,0.057,0.934l2.296,2.301c0.243,0.242,0.663,0.269,0.933,0.057l1.766-1.39c0.744,0.43,1.548,0.765,2.398,0.991l0.268,2.23c0.041,0.342,0.355,0.62,0.699,0.62h3.252c0.345,0,0.659-0.278,0.699-0.62l0.268-2.23c0.851-0.228,1.655-0.562,2.398-0.991l1.766,1.387c0.271,0.212,0.69,0.187,0.933-0.056l2.299-2.301c0.244-0.242,0.269-0.662,0.056-0.935l-1.388-1.764c0.431-0.744,0.764-1.548,0.992-2.397l2.23-0.268C24.721,14.785,25,14.473,25,14.127v-3.252C25.001,10.529,24.723,10.216,24.38,10.175z M12.501,18.75c-3.452,0-6.25-2.798-6.25-6.25s2.798-6.25,6.25-6.25s6.25,2.798,6.25,6.25S15.954,18.75,12.501,18.75z" />
                            </g>
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                            <g />
                          </svg>
                        </div>
                        <div
                          v-else
                          id="wave"
                          class="ml-1"
                        >
                          <span class="dot" />
                          <span class="dot" />
                          <span class="dot" />
                        </div>
                      </span>
                    </div>
                  </v-overlay>
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
                        class="pb-1 mt-4"
                        type="text"
                        label="Name"
                        :rules="uploadItem.rules.name"
                      />
                      <v-row>
                        <v-col
                          cols="12"
                          sm="4"
                        >
                          <v-text-field
                            v-model="uploadItem.values.width"
                            :rules="uploadItem.rules.width"
                            class="pb-1"
                            type="text"
                            label="Breite"
                            disabled
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="4"
                        >
                          <v-text-field
                            v-model="uploadItem.values.height"
                            :rules="uploadItem.rules.height"
                            class="pb-1"
                            type="text"
                            label="Höhe"
                            disabled
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="4"
                        >
                          <v-radio-group
                            v-model="uploadItem.values.orientation"
                            row
                            mandatory
                          >
                            <v-radio
                              value="Hoch"
                            >
                              <template v-slot:label>
                                <v-icon left>
                                  mdi-cellphone
                                </v-icon>
                                Hoch
                              </template>
                            </v-radio>
                            <v-radio
                              value="Breit"
                            >
                              <template v-slot:label>
                                <v-icon left>
                                  mdi-cellphone mdi-rotate-90
                                </v-icon>
                                Breit
                              </template>
                            </v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-text-field
                            v-model="uploadItem.values.category"
                            class="pb-1"
                            type="text"
                            label="Kategorie"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
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
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-file-input
                            v-model="file"
                            :rules="fileRules"
                            show-size
                            filled
                            label="Datei"
                            accept="video/mp4, image/*"
                            placeholder="Wähle ein Video aus"
                            @change="inspectFile"
                            @click:clear="resetUploadForm"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-text-field
                            v-model="uploadItem.values.length"
                            class="pb-1"
                            type="text"
                            label="Länge (in Sekunden)"
                            :disabled="!file || file.type.startsWith('video/')"
                          />
                        </v-col>
                      </v-row>
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
                          v-model="selectedItem.name"
                          class="pb-1 mt-4"
                          type="text"
                          label="Name"
                          :rules="[v => !!v || 'Name ist ein Pflichtfeld',v => (v && v.length > 4) || 'Der Name muss mindestens 5 Zeichen lang sein']"
                        />
                        <v-text-field
                          v-model="selectedItem.category"
                          class="pb-1 mt-4"
                          type="text"
                          label="Kategorie"
                        />
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                          >
                            <v-radio-group
                              v-model="selectedItem.orientation_V2"
                              mandatory
                            >
                              <v-radio
                                value="Hoch"
                              >
                                <template v-slot:label>
                                  <v-icon left>
                                    mdi-cellphone
                                  </v-icon>
                                  Hoch
                                </template>
                              </v-radio>
                              <v-radio
                                value="Breit"
                              >
                                <template v-slot:label>
                                  <v-icon left>
                                    mdi-cellphone mdi-rotate-90
                                  </v-icon>
                                  Breit
                                </template>
                              </v-radio>
                            </v-radio-group>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                          >
                            <v-radio-group
                              v-model="selectedItem.rotation"
                              mandatory
                            >
                              <v-radio
                                label="Ohne Rotation"
                                :value="null"
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
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-btn
                              :disabled="!valid || loadingButton"
                              :loading="loadingButton"
                              color="success"
                              class="mr-4"
                              @click="sendEdit(item); dialog.value = false; resetValidation(action.action)"
                            >
                              Speichern
                            </v-btn>
                          </v-col>
                        </v-row>
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
        <v-menu
          v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute
          transition="slide-y-transition"
          offset-y
        >
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-menu
                  open-on-click
                  offset-x
                  transition="slide-y-transition"
                >
                  <template v-slot:activator="{on, attrs}">
                    <v-row
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-col
                        cols="10"
                      >
                        Zu Playlist Hinzufügen
                      </v-col>
                      <v-col
                        cols="2"
                      >
                        <v-icon
                          class="float-right"
                        >
                          mdi-chevron-right
                        </v-icon>
                      </v-col>
                    </v-row>
                    <v-row
                      style="cursor: pointer;"
                      @click="addPlaylist"
                    >
                      <v-col
                        cols="10"
                      >
                        Neue Playlist
                      </v-col>
                      <v-col
                        cols="2"
                      >
                        <v-icon
                          class="float-right"
                        >
                          mdi-playlist-plus
                        </v-icon>
                      </v-col>
                    </v-row>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-icon>
                          mdi-window-close mdi-spin
                        </v-icon>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-icon>
                          mdi-window-close mdi-spin
                        </v-icon>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-icon>
                          mdi-window-close mdi-spin
                        </v-icon>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
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
  import Socket from '@/plugins/socket'
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
      showMenu: false,
      x: 0,
      y: 0,
      loader: false,
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
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Kategorie',
          value: 'category',
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
        {
          sortable: false,
          text: '',
          value: 'actions',
        },
      ],
      items: [],
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
          category: null,
          length: null,
        },
      },
      uploadProgress: 0,
      uploadText: 'Die Datei wird Hochgeladen',
      selectedItem: {},
      fileRules: [
        v => !!v || 'Das Video ist ein Pflichtfeld',
      ],
      file: null,
      search: null,
    }),
    computed: {
      ...sync('app', [
        'videos',
      ]),
    },
    beforeMount () {
      Socket.send('video')
      Socket.send('link')
    },
    methods: {
      addPlaylist () {
        console.log(this.selectedItem)
        this.selectedItem = {}
      },
      show (e, item) {
        this.selectedItem = item.item
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },
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
      actionHandle: function (action, item) {
        this[action.action](item)
      },
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
            Socket.send('video')
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
            // const itemPos = this.videos.map(function (x) { return x.id }).indexOf(this.selectedItem.id)
            // console.log(this.videos, itemPos)
            // this.videos.splice(itemPos, 1)
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
          .finally(() => {
            Socket.send('video')
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
        this.file = null
        for (const key in this.uploadItem.values) {
          this.uploadItem.values[key] = null
        }
      },
      inspectFile: function () {
        if (!!this.file && this.file.type.startsWith('image/')) {
          const img = new Image()
          img.src = URL.createObjectURL(this.file)
          img.onload = () => {
            this.uploadItem.values.name = this.file.name.slice(0, -4)
            this.uploadItem.values.height = img.height
            this.uploadItem.values.width = img.width
            this.uploadItem.values.length = 10
            this.uploadItem.values.orientation = img.width > img.height ? 'Breit' : 'Hoch'
          }
        } else if (!!this.file && this.file.type.startsWith('video/')) {
          const vid = document.createElement('video')
          vid.src = URL.createObjectURL(this.file)
          vid.addEventListener('loadedmetadata', e => {
            this.uploadItem.values.name = this.file.name.replace(/.mp4$/, '')
            this.uploadItem.values.height = e.path[0].videoHeight
            this.uploadItem.values.width = e.path[0].videoWidth
            this.uploadItem.values.length = e.path[0].duration
            this.uploadItem.values.orientation = e.path[0].videoWidth > e.path[0].videoHeight ? 'Breit' : 'Hoch'
          })
        }
      },
      upload: function () {
        if (this.validate()) {
          this.loader = true
          const config = {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              if (percentCompleted > 95) {
                this.uploadProgress = 95
                this.uploadText = 'Die Datei wird verarbeitet'
              } else {
                this.uploadProgress = percentCompleted
              }
            },
          }
          // todo: add upload progress
          const postData = new FormData()
          postData.append('videoUUID', uuidv4())
          postData.append('name', this.uploadItem.values.name)
          postData.append('category', this.uploadItem.values.category)
          postData.append('width', this.uploadItem.values.width)
          postData.append('height', this.uploadItem.values.height)
          postData.append('orientation', this.uploadItem.values.orientation)
          if (this.uploadItem.values.rotation !== 0) {
            postData.append('rotation', this.uploadItem.values.rotation)
          }
          postData.append('length', this.uploadItem.values.length)
          postData.append('uploadedFile', this.file)
          axios.post('http://kodizabbix:3333/v2/video', postData, config).then(response => {
            this.loader = false
            this.alert = {
              value: true,
              type: 'success',
              text: response.data.message,
            }
          }).catch(error => {
            this.loader = false
            this.alert = {
              value: true,
              type: 'error',
              text: error.response.data.message,
            }
          }).finally(() => {
            Socket.send('video')
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

div#wave
  position: relative
  text-align: center
  .dot
    display: inline-block
    width: 4px
    height: 4px
    border-radius: 50%
    margin-right: 3px
    background: #fff
    animation: wave 1.3s linear infinite
    &:nth-child(2)
      animation-delay: -1.1s
    &:nth-child(3)
      animation-delay: -0.9s

@keyframes wave
  0%, 60%, 100%
    transform: initial
  30%
    transform: translateY(-5px)

#bigCog
  animation: spinBigCog 2.5s linear infinite
  transform-origin: 50% 50%
  display: inline-block
@keyframes spinBigCog
  0%
    transform: rotate(360deg)
  100%
    transform: rotate(0deg)

#smallCog
  animation: spinSmallCog 2.5s linear infinite
  transform-origin: 50% 50%
  transform: rotate(22deg)
  display: inline-block
@keyframes spinSmallCog
  0%
    transform: rotate(22deg)
  100%
    transform: rotate(382deg)
</style>
