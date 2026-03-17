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
            <v-col cols="2"/>
          </v-row>
        </v-container>
      </v-app-bar-title>
    </v-app-bar>

    <!-- main content -->
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>