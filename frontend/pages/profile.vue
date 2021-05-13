<template>
  <div class="mt-16">
    <v-row>
      <v-col cols="12" md="5">
        <span class="headline text-uppercase">User Profile</span>
        <div v-if="!upd">
          <v-divider class="mt-8 mb-2"></v-divider>
          <div>
            <span class="text-subtitle-2 grey--text text-uppercase mr-16">Name</span>
            <span class="text-body-1">{{ user.name }}</span>
          </div>
          <v-divider class="my-2"></v-divider>
          <div>
            <span class="text-subtitle-2 grey--text text-uppercase mr-16">Email</span>
            <span class="text-body-1">{{ user.email }}</span>
          </div>
          <v-divider class="my-2"></v-divider>
          <v-btn @click="upd=true" text outlined class="mt-3 primary--text">Update Profile</v-btn>
        </div>

        <v-card v-else width="550" class="mt-8 pl-2 pr-4 pt-2" outlined>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="user.name"
                label="Change name"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                :rules="[v => /.+@.+\..+/.test(v) || 'Email must be valid']"
                label="Change email"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                :type="show1 ? 'text' : 'password'"
                label="Type new password"
                @click:append="show1 = !show1"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.confirmPassword"
                :rules="[v => v === this.user.password || 'The password confirmation does not match']"
                :append-icon="show2 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                :type="show2 ? 'text' : 'password'"
                label="Confirm password"
                @click:append="show2 = !show2"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="px-4 pb-6 d-flex flex-row-reverse">
            <v-btn :loading="loading" class="primary px-4" @click="onUpdate">
              Save
            </v-btn>
            <v-btn text class="primary--text mr-2" @click="onCancel">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
      <v-col cols="12" md="7">
        <span class="headline text-uppercase">My Orders</span>
        <v-alert
          class="mt-8"
          icon="mdi-firework"
          outlined
        >
          Your orders is empty .
        </v-alert>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar"
      timeout="3000"
      outlined
      :color="snackbarColor"
      top
      right
      class="mt-14"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbarColor"
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
  data() {
    return {
      upd: false,
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
      snackbarColor: '',
      snackbarText: ''
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    onUpdate () {
      console.log('user in form', this.user)
      this.loading = true
      this.$store.dispatch('user/updateUser', this.user)
      .then(res => {
        if(res.status == 200) {
          console.log('updated response ',res)
          this.loading = false
          this.upd = false
          this.user = res.data
          localStorage.setItem('user-info', JSON.stringify(res.data))
          this.snackbar = true
          this.snackbarColor = 'success'
          this.snackbarText = 'User successfully updated'
        } else {
          this.loading = false
          this.snackbar = true
          this.snackbarColor = 'error'
          this.snackbarText = 'Something went wrong!'
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
        this.snackbar = true
        this.snackbarColor = 'error'
        this.snackbarText = 'Something went wrong!'
      })
    },
    onCancel () {
      this.upd = false
      this.getUser()
    },
    getUser () {
      const user = JSON.parse(localStorage.getItem('user-info'))
      this.user.name = user.name
      this.user.email = user.email
    }
  }
}
</script>

<style>

</style>
