<script setup lang="ts">
import {FinalScore} from "~/domain/match/FinalScore.ts";

const props = defineProps({
  score: { type: FinalScore, required: true },
})
</script>

<template>
  <v-card>
    <v-container class="pa-3">
      <v-row justify="center">
        <v-col cols="2" align-self="center">
          Score:
        </v-col>
        <v-col cols="8" class="text-center">
          <v-chip :prepend-icon="score.aWin() ? 'mdi-trophy' : ''" :append-icon="score.bWin() ? 'mdi-trophy' : ''">
            {{ score.aScore }} : {{ score.bScore }}
          </v-chip>
        </v-col>
        <v-col cols="2" />
      </v-row>
      <v-row class="my-1">
        <v-col class="my-1">
          <v-divider />
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col cols="6">
          <v-row dense>
            <v-col dense><b>Team A:</b></v-col>
          </v-row>
          <v-row dense class="my-1" v-for="player in score.aPlayers">{{ player.name }}</v-row>
        </v-col>
        <v-col cols="6">
          <v-row dense>
            <v-col dense><b>Team B:</b></v-col>
          </v-row>
          <v-row dense class="my-1" v-for="player in score.bPlayers">{{ player.name }}</v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<style scoped>

</style>