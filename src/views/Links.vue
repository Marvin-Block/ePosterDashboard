<template>
  <v-container
    id="data-tables-view"
    fluid
    tag="section"
  >
    <material-card
      title="Links"
    >
      <v-card-text>
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
      </v-card-text>
    </material-card>
  </v-container>
</template>

<script>
  import { get } from 'vuex-pathify'
  export default {
    name: 'Links',

    data: () => ({

    }),
    computed: {
      videos: get('app/videos'),
      devices: get('app/devices'),
    },
  }
</script>
