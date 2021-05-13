<template>
  <div class="mt-16 pt-4">
    <v-card width="550" class="mx-auto px-4 pt-2" outlined>
      <v-card-title class="text-uppercase justify-center">Sign Up</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="user.name"
            :rules="[v => !!v || 'Name is required']"
            label="Enter name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="Enter email"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="passwordRules"
            :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="show1 ? 'text' : 'password'"
            label="Enter password"
            @click:append="show1 = !show1"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.confirmPassword"
            :rules="confirmPasswordRules"
            :append-icon="show2 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="show2 ? 'text' : 'password'"
            label="Confirm password"
            @click:append="show2 = !show2"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="px-4 pb-6 d-flex justify-space-between">
        <div class="d-flex align-center">
          Already an user?
          <v-btn to="/login" text class="primary--text">
            Sign In
          </v-btn>
        </div>
        <v-btn :loading="loading" :disabled="!valid" class="primary" @click="onRegister">
          Register
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      timeout="3000"
      outlined
      color="error"
      top
      right
      class="mt-14"
    >
      Something went wrong!
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      show1: false,
      show2: false,
      loading: false,
      snackbar: false,

      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Please type password.'
      ],
      confirmPasswordRules: [
        v => !!v || 'Type confirm password',
        v => v === this.user.password || 'The password confirmation does not match'
      ],
    }
  },
  methods: {
    onRegister() {
      this.loading = true
      this.$store.dispatch('user/register', this.user)
      .then(res => {
        if(res.status == 200 || res.status == 201) {
          this.loading = false
          console.log('after login res', res)
          localStorage.setItem('user-info', JSON.stringify(res.data))
          this.$bus.$emit('loginRes', res.data)
          this.$router.push('/')
        } else {
          this.loading = false
          this.snackbar = true
        }
      }).catch(err => {
        this.loading = false
        this.snackbar = true
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
