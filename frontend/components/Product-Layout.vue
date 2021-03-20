<template>
  <div>
    <div class="headline ml-3 mt-16">LATEST PRODUCTS</div>
    <v-row v-if="!loading" class="ma-0 mt-7">
      <v-col
        cols="12"
        sm="4"
        class="pa-0"
        v-for="product in products"
        :key="product._id"
      >
        <Product :product="product" />
      </v-col>
    </v-row>
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
import Product from './Product'
export default {
  copmonents: {
    Product,
  },
  data() {
    return {
      products: [],
      loading: true,
    }
  },
  created() {
    this.$store.dispatch('product/getProducts').then((res) => {
      this.loading = false
      this.products = res.data
    })
  },
}
</script>

<style></style>
