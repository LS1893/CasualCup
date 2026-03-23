<template>
  <v-app>

    <!-- toolbar -->
    <v-app-bar class="my-toolbar" height="96" app>
      <v-app-bar-title class="text-h3">
        
        <v-container>
          <v-row>
            <v-col cols="2"><v-img src="/images/CasualCup.png"
              alt="Logo"
              max-width="120"
              contain/>
            </v-col>
            <v-col cols="8" class="text-center"><EditableHeadline/></v-col>
            <v-col cols="2" class="d-flex justify-end">
              <v-btn icon class="h-100 w-50" @click="dialog = true">
                <v-icon size="x-large">mdi-information-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar-title>
    </v-app-bar>

    <!-- main content -->
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>

      <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="4"><v-img src="/images/CasualCup.png"
              alt="Logo"
              max-width="120"
              contain/>
            </v-col>
            <v-col class="d-flex align-center" cols="8">
              <v-card-title class="text-h4 font-weight-bold">Casual Cup Regeln</v-card-title>
            </v-col>
          </v-row>
          
          <v-card-text>
            <br>
            Casual Cup ist das System für das lockere Fun-Turnier nebenbei!
            <br><br>
            <p>
              sucht euch einfach eure Partnerin oder euren Partner und zwei Gegner und spielt eine normale Runde Bierpong (6 Becher pro Team).
              am Ende tragt ihr euer Ergebnis für die Matchpaarung ein. Per ELO-Wertung wird eure individuelle Punktzahl angepasst. 
              <br><br>
              Eure Punktzahl steigt stärker, wenn ihr gut platzierte Gegner schlagt und weniger stark, wenn ihr schlecht platzierte Gegner schlagt.
              Anders herum fällt eure Punktzahl stark, wenn ihr gegen schlecht platzierte Gegner verliert und weniger stark, wenn ihr gegen gut platzierte Gegner verliert.
              <br><br>
              Die ELO-Wertung macht es möglich, Spieler gegeneinander zu ranken ohne dass sie die selben Mitspieler, Gegener oder die selbe Anzahl Spiele hatten.
              Gewonnen hat der einzelne Spieler, der die höchste Punktzahl und mindestens 3 Spiele gespielt hat.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Schließen</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false);
</script>