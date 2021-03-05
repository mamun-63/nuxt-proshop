<template>
  <div>
    <div class="headline ml-3 mt-16">LATEST PRODUCTS</div>
    <v-row class="ma-0 mt-7">
      <v-col cols="12" sm="4" class="pa-0" v-for="product in products" :key="product._id">
        <Product :product="product"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Product from './Product'
export default {
  copmonents: {
    Product
  },
  data() {
    return {
      products: []
    }
  },
  async created() {
    const res = await this.$axios.get('/api/products')
    this.products = res.data
  }
}
</script>

<style>

</style>
