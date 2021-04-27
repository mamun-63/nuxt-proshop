<template>
  <div class="mt-16">
    <div v-if="!loading">
      <v-row>
        <v-col cols="8">
          <div class="text-uppercase headline mb-3">Shopping Cart</div>
          <v-alert
            v-show="cartItems.length === 0"
            border="top"
            color="green lighten-1"
            dark
          >
            Your Shopping cart is empty.
          </v-alert>
          <div class="d-flex" v-for="item in cartItems" :key="item.id">
            <v-col cols="4">
              <nuxt-link :to="`/product/${item.id}`">
                <v-img aspect-ratio="1.7" :src="item.image"></v-img>
              </nuxt-link>
            </v-col>
            <v-col cols="3">{{ item.name }}</v-col>
            <v-col cols="2">${{ item.price }}</v-col>
            <v-col cols="2">
              <v-select
                @change="onChange(item)"
                v-model="item.qty"
                :items="item.qtyItems"
                label="Quantity"
              ></v-select>
            </v-col>
            <v-col cols="1">
              <v-btn icon @click="removeItem(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </div>
        </v-col>
        <v-col cols="4">
          <v-card outlined>
            <v-card-title
              >SUBTOTAL ({{
                cartItems.reduce((total, item) => item.qty + total, 0)
              }}) ITEMS</v-card-title
            >
            <v-card-text>
              <div class="text-h6">
                ${{
                  cartItems
                    .reduce((total, item) => item.qty * item.price + total, 0)
                    .toFixed(2)
                }}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                block
                tile
                class="mx-auto"
                :disabled="cartItems.length == 0"
                @click="onCheckout"
                >Proceed To Checkout</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else class="text-center">
      <v-progress-circular
        class="mt-16 pt-16"
        size="80"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    cartItems() {
      this.$bus.$emit('cartLength', this.cartItems.length)
    },
  },
  data() {
    return {
      cartItems: [],
      loading: true,
    }
  },
  mounted() {
    if(this.$route.params.id) {
      console.log('params id found', this.$route.params.id)
      this.$store.dispatch('product/getProducts').then((res) => {
      this.loading = false
      console.log('response', res.data)
      const product = res.data.find(
        (item) => item._id === this.$route.params.id
      )
      const item = {
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: parseInt(this.$route.query.qty),
        qtyItems: [],
      }

      console.log('qty', item.qty)

      for (let i = 1; i <= item.countInStock; i++) {
        item.qtyItems[i - 1] = i
      }

      if (localStorage.getItem('cart-items')) {
        console.log('some items in localstorage')
        this.cartItems = JSON.parse(localStorage.getItem('cart-items'))
        let existItem = this.cartItems.find((el) => el.id === item.id)
        if (existItem) {
          console.log('item already exist', existItem)
        } else {
          console.log('its a new item adding')
          this.cartItems.push(item)
          localStorage.setItem('cart-items', JSON.stringify(this.cartItems))
        }
      } else {
        console.log('empty localstorage', this.cartItems)
        this.cartItems.push(item)
        localStorage.setItem('cart-items', JSON.stringify(this.cartItems))
      }
    })
    } else {
      console.log('no id found in params')
       if (localStorage.getItem('cart-items')) {
         this.cartItems = JSON.parse(localStorage.getItem('cart-items'))
       }
       this.loading = false
    }
  },
  methods: {
    onChange(item) {
      console.log('onChange', item)
      console.log('after change', this.cartItems)
      let index = this.cartItems.findIndex((el) => el.id === item.id)
      console.log('item index', index)

      this.cartItems[index].qty = item.qty
      localStorage.setItem('cart-items', JSON.stringify(this.cartItems))
    },

    removeItem(item) {
      let index = this.cartItems.findIndex((el) => el.id === item.id)
      console.log('item index', index)
      this.cartItems.splice(index, 1)
      localStorage.setItem('cart-items', JSON.stringify(this.cartItems))
    },

    onCheckout() {},
  },
}
</script>

<style></style>
