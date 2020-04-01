<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">PLANNER</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
        <v-btn text to="/">home</v-btn>
        <v-btn text to="/new-plan">new plan</v-btn>
      
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<style>

</style>
