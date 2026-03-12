<script setup>
const { headers, items} = calculateScoreTable()
</script>

<template>
  <v-container>

    <v-row>
      <v-col cols="6">
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          hide-default-footer
        />
      </v-col>

      
      <v-col cols="6">
        <v-btn color="primary" text="new match" to="/match-setup"></v-btn>
      </v-col>

    </v-row>
    
  </v-container>
</template>

<script setup>
</script>