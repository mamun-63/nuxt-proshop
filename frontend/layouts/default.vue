<template>
  <v-app>
    <v-app-bar hide-on-scroll height="60">
      <nuxt-link class="ml-16 pl-12 text-h6 defaultFont-color" to="/">Proshop</nuxt-link>
      <v-spacer/>
      <v-btn text class="text-button" to="/cart">
        <v-icon class="mr-1" small>mdi-cart</v-icon>
        cart
      </v-btn>
      <div class="mr-16 pr-12">
        <v-btn text class="text-button" to="/login">
          <v-icon class="mr-1" small>mdi-account</v-icon>
          Sign In
        </v-btn>
      </div>
    </v-app-bar>
    <v-main class="mx-16 px-16">
      <v-container class="px-0 py-4">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer height="60">
      <v-row justify="center" class="mx-16 px-12">Copyright &copy; Nuxt-Proshop {{ new Date().getFullYear() }}</v-row>
    </v-footer>
  </v-app>
</template>
