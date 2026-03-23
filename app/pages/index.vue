<script setup lang="ts">
import {FinalScore} from "~/domain/match/FinalScore.ts";
import {Player} from "~/domain/player/Player.ts";
import Scorecard from "~/components/Scorecard.vue";
import { initParser } from '~/composables/playerService';

const matches = ref<FinalScore[]>([])
const matchDialog = ref(false)
const players = ref([]);
  const headers = [
    { title: '', key: 'position' },
    { title: 'Name', key: 'name' },
    { title: 'Spiele', key: 'matches' },
    { title: 'Punktzahl', key: 'rating' }
  ]
const rankingList = ref<any[]>([]);
const RANKING_STORAGE_KEY = 'playerRankingList';
const MATCHES_STORAGE_KEY = 'matches';
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

// error constants
const scoreError = ref('ungültiges Ergebnis');
const teamError = ref('Teamauswahl inkorrekt');
const currentErrorMsg = ref('');


onMounted(() => {
  players.value = initParser.parseInitPlayers();
  console.log('Initial geladene Spieler:', players.value);

  // read ranking from localStorage
  if (process.client) {
    const storedMatches = localStorage.getItem(MATCHES_STORAGE_KEY);

    if (storedMatches) {
      try {
        const parsedMatches = JSON.parse(storedMatches);
        matches.value = parsedMatches.map((matchData: any) => FinalScore.fromJSON(matchData));
        const newRankingData = calculateScoreTable(players.value, matches.value);
        rankingList.value = newRankingData;
      } catch (e) {
        console.error("Fehler beim Parsen der Spiele aus localStorage:", e);
        matches.value = [];
      }
    } else {}
     
  }
    
});

watch(matches, (newMatches) => {
  if (process.client) {
    try {
      localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(newMatches));
      console.log('Spiele im localStorage aktualisiert.');
    } catch (e) {
      console.error("Fehler beim Speichern der Spiele in localStorage:", e);
    }
  }
}, { deep: true });


function closeDialog() {
  matchDialog.value = false
  teamA.value = [...defaultA]
  teamAscore.value = 0
  teamB.value = [...defaultB]
  teamBscore.value = 0
  currentErrorMsg.value = '';
}

async function saveDialog(a: Player[], aScore: number, b: Player[], bScore: number) {
  loadingSaveMatch.value = true
  if(editMatch){
    matches.value = matches.value.filter(match => match.id !== currentMatchId.value);
  }
  if(!validateMatchData()){
      console.log(currentErrorMsg.value);
      loadingSaveMatch.value = false;
      return;
    }
  try {
    const score = new FinalScore("", [...teamA.value], teamAscore.value, [...teamB.value], teamBscore.value);
    matches.value.push(score)
    const newRankingData = calculateScoreTable(players.value, matches.value);
    rankingList.value = newRankingData;
    
  } catch (e) {
    // TODO print error, maybe use snackbar
    console.log('ERROR: ' + e);
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
    matches.value = matches.value.filter(match => match.id !== currentMatchId.value);

    closeDialog();
    const newRankingData = calculateScoreTable(players.value, matches.value);
    rankingList.value = newRankingData;
  } else {
    console.warn('Keine Match-ID zum Entfernen verfügbar.');
  }
}
  
const validateMatchData = () => {
  currentErrorMsg.value = '';
  let isValid = true;
  if((teamAscore.value + teamBscore.value > 12  ||  teamAscore.value + teamBscore.value < 6) ||
      (teamBscore.value != 6 && teamAscore.value != 6)){
        isValid = false;
        currentErrorMsg.value = scoreError.value;
  }

const allPlayersInGame = [...teamA.value, ...teamB.value];
const playerIdsInGame = new Set();

for (const player of allPlayersInGame) {
    if (playerIdsInGame.has(player.id)) {
        const duplicatePlayer = players.value.find(p => p.id === player.id);
        if (duplicatePlayer) {
          currentErrorMsg.value = teamError.value;
          isValid = false;
          break;
        } 
    }
    playerIdsInGame.add(player.id);
}

  if(allPlayersInGame.length != 4){
    isValid = false;
    currentErrorMsg.value = teamError.value;
  }

  return isValid;
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
                  :sort-by="[{ key: 'rating', order: 'desc' }]"
                  :headers="headers"
                  :items="rankingList"
                  class="elevation-1"
                  hide-default-footer
                  no-data-text="Es wurden noch keine Spiele gespielt"
                  item-key="id"
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
                        color="accent"
                        text="Neues Match"
                        variant="flat"
                        block
                        @click="handleOpenOverlayNewMatch()"
                    ></v-btn>
                  </template>
                <v-card>
                  <!-- Error message for match validation -->
                  <v-alert
                    v-if="currentErrorMsg"
                    type="error"
                    variant="tonal"
                    class="mb-4"
                    density="comfortable"
                    closable
                    icon="mdi-alert"
                  >
                    <v-alert-title>Validierungsfehler!</v-alert-title>
                    {{ currentErrorMsg }}
                  </v-alert>

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
                            ref="teamBSelectRef"
                            reverse
                            controlVariant="default"
                            label="Score Team B"
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
                        <v-select v-model="teamB" :items="players" multiple :max-values="2" return-object item-title="name" :label="`Team B Spieler`"></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn dense variant="outlined" color="alert" @click="closeDialog">Abbruch</v-btn>
                    <v-btn v-if="editMatch" dense variant="tonal" color="primary" @click="deleteMatch()">Löschen</v-btn>
                    <v-btn v-if="!editMatch" dense variant="tonal" color="secondary" @click="saveDialog(teamA, teamAscore, teamB, teamBscore)">Speichern</v-btn>
                    <v-btn v-if="editMatch" dense variant="tonal" color="secondary" @click="saveDialog(teamA, teamAscore, teamB, teamBscore)">Speichern</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row density="comfortable">
            <!-- style="border: 1px solid;" -->
            <v-col density="comfortable">
              <div class="scorecards-scroll-area">
                <Scorecard @open-overlay="handleOpenOverlay" v-for="score in matches.slice().reverse()" :score="score" class="mb-3"/>

              </div>
              
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>