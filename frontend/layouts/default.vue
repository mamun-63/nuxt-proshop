<template>
  <v-app>
    <v-app-bar fixed max-height="60">
      <nuxt-link class="ml-16 pl-12 text-h6" to="/">PROSHOP</nuxt-link>
      <v-spacer />
      <v-btn text class="text-button mr-1" to="/cart">
        <v-badge :content="messages" :value="messages" color="green" overlap>
          <v-icon class="">mdi-cart</v-icon>
        </v-badge>
        <span class="ml-2">cart</span>
      </v-btn>
      <div class="mr-16 pr-12">
        <v-btn v-if="!user" text class="text-button" to="/login">
          <v-icon class="mr-1">mdi-account</v-icon>
          Sign In
        </v-btn>
        <v-menu v-else offset-y transition="scale-transition" rounded>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">{{ user.name }}</span>
            <v-icon v-bind="attrs" v-on="on"> mdi-menu-down </v-icon>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn to="/profile" text>Profile</v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn @click="onLogout" text>Log Out</v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
      user: ''
    }
  },

  // Event Bus is working in before Mount mostly
  beforeMount() {
    this.$bus.$on('cartLength', (len) => {
      console.log('bus is on')
      this.messages = len
    })
    this.$bus.$on('loginRes', res => {
      console.log('event bus on for login', res)
      this.user = res
    })
  },
  // local storage can be accessed only in mounted or later
  mounted() {
    console.log('default mounted')

    if(localStorage.getItem('cart-items')) {
      const items = JSON.parse(localStorage.getItem('cart-items'))
      console.log('home page local items check', items.length)
      this.messages = items.length
    } else {
      this.messages = 0
    }

    if(localStorage.getItem('user-info')) {
      this.user = JSON.parse(localStorage.getItem('user-info'))
    }
  },

  methods: {
    onLogout () {
      localStorage.removeItem('user-info')
      localStorage.removeItem('proshop-token')
      this.user = ''
      this.$router.push('/')
    }
  }
}
</script>
