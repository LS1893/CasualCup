<script setup lang="ts">
import {FinalScore} from "~/domain/match/FinalScore.ts";
import {Player} from "~/domain/player/Player.ts";

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
          <Scorecard v-for="score in matches" :score="score" class="mb-3"/>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>