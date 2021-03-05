<template>
  <v-card class="mx-3 mb-7" max-width="374">
    <nuxt-link :to="`/product/${product._id}`">
      <v-img height="250" :src="`${product.image}`"></v-img>
    </nuxt-link>
    <nuxt-link :to="`/product/${product._id}`">
      <v-card-title class="line-clamp-2 mb-2" style="height: 88px">{{
        product.name
      }}</v-card-title>
    </nuxt-link>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="product.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          {{ product.rating }} ({{ product.numReviews }})
        </div>
      </v-row>

      <div class="my-4 subtitle-1">$ {{ product.price }}</div>

      <div class="line-clamp-3" style="height: 66px">
        {{ product.description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text :to="`/product/${product._id}`">
        Details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      default: null,
      type: Object,
    },
  },
  data: () => ({
    selection: 1,
    imageUrl: '',
  }),

  methods: {},
}
</script>
