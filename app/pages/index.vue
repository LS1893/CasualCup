<script setup lang="ts">
import {FinalScore} from "~/domain/match/FinalScore.ts";
import {Player} from "~/domain/player/Player.ts";
import Scorecard from "~/components/Scorecard.vue";
import { initParser } from '~/composables/playerService';

const matchDialog = ref(false)
const { headers, items} = calculateScoreTable()
const players = ref([]);

onMounted(() => {
  players.value = initParser.parseInitPlayers();
  console.log('Initial geladene Spieler:', players.value);
});

const matches = ref([])
const teamA = ref([])
const teamB = ref([])
const teamAscore = ref(0)
const teamBscore = ref(0)
const defaultA = []
const defaultB = []

const loadingSaveMatch = ref(false);
const overlayHeadline = ref('Neues Match eintragen');
const editMatch = ref(false);
const currentMatchId = ref(null);

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
    const score = new FinalScore([...teamA.value], teamAscore.value, [...teamB.value], teamBscore.value);
    matches.value.push(score)
  } catch (e) {
    // TODO print error, maybe use snackbar
  } finally {
    closeDialog();
    loadingSaveMatch.value = false
  }
}

const handleOpenOverlayNewMatch = () => {
  editMatch.value = false;
  overlayHeadline.value = 'Neues Match eintragen';
};

const handleOpenOverlay = (newHeadline, score) => {
  editMatch.value = true;
  overlayHeadline.value = newHeadline;
  currentMatchId.value = score.id;
  teamAscore.value = score.aScore;
  teamBscore.value = score.bScore;
  teamA.value = score.aPlayers;
  teamB.value = score.bPlayers;
  matchDialog.value=true;
};

const deleteMatch= () => {
  if (currentMatchId.value) {
    console.log('Match mit ID', currentMatchId.value, 'wird entfernt.');
    // Hier die Logik zum Entfernen des Matches aus deiner "matches"-Liste
    // Beispiel: Filtern der Liste
    matches.value = matches.value.filter(match => match.id !== currentMatchId.value);

    // Optional: API-Call, um das Match auch vom Server zu löschen
    // await yourApiService.deleteMatch(currentMatchId.value);

    // Dialog und Zustand schließen/zurücksetzen, nachdem das Match entfernt wurde
    closeDialog(); // Schließt das Dialog und setzt alle related States zurück
  } else {
    console.warn('Keine Match-ID zum Entfernen verfügbar.');
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
          <v-row density="comfortable">
            <v-col density="comfortable">
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
                      @click="handleOpenOverlayNewMatch()"
                  ></v-btn>
                </template>
                <v-card>
                  <v-card-title><b>{{ overlayHeadline }}</b></v-card-title>
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
                            :min="0"
                            :max="6"
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
                            :min="0"
                            :max="6"
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
                    <v-btn v-if="editMatch" dense variant="tonal" color="primary" @click="deleteMatch()">Löschen</v-btn>
                    <v-btn dense variant="tonal" color="secondary" @click="saveDialog(teamA, teamAscore, teamB, teamBscore)">Speichern</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row density="comfortable">
            <v-col density="comfortable">
              <Scorecard @open-overlay="handleOpenOverlay" v-for="score in matches" :score="score" class="mb-3"/>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>