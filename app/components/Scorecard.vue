<script setup lang="ts">
import {FinalScore} from "~/domain/match/FinalScore.ts";

const props = defineProps({
  score: { type: FinalScore, required: true },
})
</script>

<template>
  <v-card>
    <v-container>
      <v-row justify="center">
        <v-col cols="2">
          Score:
        </v-col>
        <v-col cols="10">
          <v-chip :prepend-icon="score.aWin() ? 'mdi-trophy' : ''" :append-icon="score.bWin() ? 'mdi-trophy' : ''">
            {{ score.aScore }} : {{ score.bScore }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-divider />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-row dense>
            <v-col dense>Team A:</v-col>
          </v-row>
          <v-row dense class="my-1" v-for="player in score.aPlayers">{{ player.name }}</v-row>
        </v-col>
        <v-col cols="6">
          <v-row dense>
            <v-col dense>Team B:</v-col>
          </v-row>
          <v-row dense class="my-1" v-for="player in score.bPlayers">{{ player.name }}</v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<style scoped>

</style>