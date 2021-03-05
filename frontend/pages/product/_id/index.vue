<template>
  <div class="mt-16">
    <v-row>
      <v-col cols="12" sm="5">
        <v-img :src="`${product.image}`"></v-img>
      </v-col>

      <v-col cols="12" sm="4">
        <div class="headline my-5">{{product.name}}</div>
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

      <v-col cols="12" sm="3">
        <v-card tile>
          <v-card-text>
            <div class="my-5 subtitle-1">
              <span class="">Price </span>
              <span class="float-right">${{ product.price }}</span>
            </div>
            <v-divider></v-divider>
            <div class="my-5 subtitle-1">
              <span class="">Status </span>
              <span v-if="product.countInStock" class="float-right">In Stock</span>
              <span v-else class="float-right">Out of Stock</span>
            </div>
            <v-divider></v-divider>
            <div class="my-5 subtitle-1">
              <span class="">Quantity </span>
              <span class="float-right">{{ product.countInStock }}</span>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn :disabled="!product.countInStock" outlined text color="deep-purple lighten-2">Add to Cart</v-btn>
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
      product: {}
    }
  },
created() {
  console.log(this.$route.params.id, this.$products)
  this.$products.map(item => {
    if(item._id===this.$route.params.id) {
      this.product = item
    }
  })
  console.log(this.product)
}
}
</script>

<style>

</style>
