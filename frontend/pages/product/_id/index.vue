<template>
  <div class="mt-16">
    <v-row class="mt-3">
      <v-col cols="12" sm="4">
        <v-img :src="`${product.image}`"></v-img>
      </v-col>

      <v-col cols="12" sm="4">
        <div class="headline mt-0 mb-6">{{ product.name }}</div>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="product.rating"
            color="amber"
            dense
            half-increments
            readonly
            size="18"
          ></v-rating>
          <div class="ml-4">
            {{ product.rating }} ({{ product.numReviews }})
          </div>
        </v-row>
        <div class="my-5 subtitle-1">
          <span class="font-weight-bold">Price: </span>
          ${{ product.price }}
        </div>
        <div>
          <span class="text-body-1 font-weight-bold">Description: </span>
          {{ product.description }}
        </div>
      </v-col>

      <v-col cols="12" sm="4" class="pl-10">
        <v-card tile class="elevation-5">
          <v-card-text>
            <div class="my-5 py-1 px-2 subtitle-1 blue darken-2 white--text">
              <span class="">Price </span>
              <span class="float-right">${{ product.price }}</span>
            </div>
            <v-divider></v-divider>
            <div class="my-5 py-1 px-2 subtitle-1 blue darken-2 white--text">
              <span class="">Status </span>
              <span v-if="product.countInStock" class="float-right"
                >In Stock</span
              >
              <span v-else class="float-right">Out of Stock</span>
            </div>
            <v-divider></v-divider>
            <div class="my-5 py-1 px-2 subtitle-1 blue darken-2 white--text">
              <span class="">Quantity </span>
              <span class="float-right">{{ product.countInStock }}</span>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              :disabled="!product.countInStock"
              text
              class="text-body-1 font-wight-black"
              >Add to Cart</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
    }
  },
  async mounted() {
    console.log('params id ', this.$route.params.id)
    const res = await this.$axios.get(`/api/products/${this.$route.params.id}`)
    this.product = res.data
  },
}
</script>

<style></style>
