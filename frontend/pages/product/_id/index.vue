<template>
  <div class="mt-16">
    <v-row v-if="!loading" class="mt-3">
      <v-col cols="12" sm="5">
        <v-img :src="`${product.image}`"></v-img>
      </v-col>

      <v-col cols="12" sm="3">
        <div class="text-h5 mt-0 mb-6">{{ product.name }}</div>
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
            <div class="my-5 subtitle-1">
              <span class="">Price </span>
              <span class="float-right">${{ product.price }}</span>
            </div>
            <v-divider></v-divider>
            <div class="my-5 subtitle-1">
              <span class="">Status </span>
              <span v-if="product.countInStock" class="float-right"
                >In Stock</span
              >
              <span v-else class="float-right">Out of Stock</span>
            </div>
            <v-divider></v-divider>
            <div class="my-3 subtitle-1">
              <div v-if="!product.countInStock">
                <span>Quantity </span>
                <span class="float-right">{{ product.countInStock }}</span>
              </div>
              <v-select
                v-else
                v-model="select"
                :items="items"
                label="Quantity"
              ></v-select>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              :disabled="!product.countInStock"
              text
              class="text-body-1 font-wight-black mx-auto"
              :to="`/cart/${this.$route.params.id}?qty=${select}`"
              >Add to Cart</v-btn
            >
          </v-card-actions>
        </v-card>
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
export default {
  data() {
    return {
      product: {},
      loading: true,
      items: [],
      select: 1,
    }
  },
  mounted() {
    console.log('params id ', this.$route.params.id)
    this.$store
      .dispatch('product/getSingleProduct', this.$route.params.id)
      .then((res) => {
        this.loading = false
        this.product = res.data
        for (let i = 1; i <= this.product.countInStock; i++) {
          this.items[i - 1] = i
        }
      })
  },
}
</script>

<style></style>
