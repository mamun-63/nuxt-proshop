<template>
  <v-app>
    <v-app-bar fixed max-height="60">
      <nuxt-link class="ml-16 pl-12 text-h6" to="/">PROSHOP</nuxt-link>
      <v-spacer />
      <v-btn text class="text-button" to="/cart">
        <v-badge :content="messages" :value="messages" color="green" overlap>
          <v-icon class="">mdi-cart</v-icon>
        </v-badge>
        <span class="ml-2">cart</span>
      </v-btn>
      <div class="mr-16 pr-12">
        <v-btn text class="text-button" to="/login">
          <v-icon class="mr-1">mdi-account</v-icon>
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
      <v-row justify="center" class="mx-16 px-12"
        >Copyright &copy; Nuxt-Proshop {{ new Date().getFullYear() }}</v-row
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      messages: 0,
    }
  },

  // Event Bus is working in before Mount mostly
  beforeMount() {
    this.$bus.$on('cartLength', (len) => {
      console.log('bus is on')
      this.messages = len
    })
  },
  // local storage can be accessed only in mounted or  later
  mounted() {
    const items = JSON.parse(localStorage.getItem('cart-items'))
    this.messages = items.length
  },
}
</script>
