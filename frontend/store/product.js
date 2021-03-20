export const state = () => ({
  products: [],
})

export const getters = {}

export const mutations = {}

export const actions = {
  async getSingleProduct(state, id) {
    try {
      const res = await this.$axios.get(`./api/products/${id}`)
      return res
    } catch (error) {
      return error
    }
  },
  async getProducts(context) {
    try {
      const res = await this.$axios.get('./api/products')
      return res
    } catch (error) {
      return error
    }
  },
}
