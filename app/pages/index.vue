<script setup lang="ts">
import {FinalScore} from "~/domain/match/FinalScore.ts";
import {Player} from "~/domain/player/Player.ts";

const matchDialog = ref(false)
const { headers, items} = calculateScoreTable()
const players: Player[] = [
    new Player(1, "Gernot", 1000),
    new Player(2, "Hafermoped", 1000),
    new Player(3, "Nascher", 1000),
    new Player(4, "Chicksterminator", 1000),
]
const a = players[0]
const matches = ref([
    new FinalScore([players[0], players[1]], 6, [players[2], players[3]], 4),
    new FinalScore([players[1], players[2]], 5, [players[0], players[3]], 1),
    new FinalScore([players[1], players[3]], 2, [players[0], players[2]], 6),
])
const teamA = ref([])
const teamB = ref([])
const teamAscore = ref(0)
const teamBscore = ref(0)
const defaultA = []
const defaultB = []

const loadingSaveMatch = ref(false)

function closeDialog() {
  matchDialog.value = false
  teamA.value = [...defaultA]
  teamAscore.value = 0
  teamB.value = [...defaultB]
  teamBscore.value = 0
}

async function saveDialog(a: Player[], aScore: number, b: Player[], bScore: number) {
  loadingSaveMatch.value = true
  try {
    debugger
    const score = new FinalScore([...teamA.value], teamAscore.value, [...teamB.value], teamBscore.value);
    matches.value.push(score)
  } catch (e) {
    // TODO print error, maybe use snackbar
  } finally {
    closeDialog();
    loadingSaveMatch.value = false
  }
}
</script>

<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="6">
        <v-container fluid fill-height outlined>
          <v-row>
            <v-col>
              <v-data-table
                  :headers="headers"
                  :items="items"
                  class="elevation-1"
                  hide-default-footer
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="6">
        <v-container>
          <v-row dense>
            <v-col dense>
              <v-dialog max-width="500" v-model="matchDialog" persistent>
                <v-overlay
                    :model-value="loadingSaveMatch"
                    class="align-center justify-center"
                    scrim="#036358"
                    contained
                >
                  <v-progress-circular indeterminate />
                </v-overlay>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                      v-bind="activatorProps"
                      color="surface-variant"
                      text="Neues Match"
                      variant="flat"
                      block
                  ></v-btn>
                </template>
                <v-card>
                  <v-card-title><b>Neues Match eintragen</b></v-card-title>
                  <v-container density="comfortable">
                    <v-row>
                      <v-col>
                        <b>Team A:</b>
                      </v-col>
                    </v-row>
                    <v-row class="mt-2">
                      <v-col>
                        <v-number-input
                            reverse
                            controlVariant="default"
                            label="Score Team A"
                            :hideInput="false"
                            :inset="false"
                            variant="outlined"
                            v-model="teamAscore"
                        />
                      </v-col>
                    </v-row>
                    <v-row density="comfortable" class="mt-2">
                      <v-col density="comfortable">
                        <v-select v-model="teamA" :items="players" multiple return-object item-title="name" :label="`Team A Spieler`"></v-select>
                      </v-col>
                    </v-row>
                    <v-divider class="mb-3 mt-1"/>
                    <v-row class="mt-2">
                      <v-col>
                        <b>Team B:</b>
                      </v-col>
                    </v-row>
                    <v-row class="mt-2">
                      <v-col>
                        <v-number-input
                            reverse
                            controlVariant="default"
                            label="Score Team A"
                            :hideInput="false"
                            :inset="false"
                            variant="outlined"
                            v-model="teamBscore"
                        />
                      </v-col>
                    </v-row>
                    <v-row density="comfortable" class="mt-2">
                      <v-col density="comfortable">
                        <v-select v-model="teamB" :items="players" multiple return-object item-title="name" :label="`Team B Spieler`"></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn dense variant="outlined" color="alert" @click="closeDialog">Abbruch</v-btn>
                    <v-btn dense variant="tonal" color="primary" @click="saveDialog(teamA, teamAscore, teamB, teamBscore)">Speichern</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col dense>
              <Scorecard v-for="score in matches" :score="score" class="mb-3"/>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>