export const state = () => ({

})

export const getters = {}

export const mutations = {}

export const actions = {
  async login(context, user) {
    try {
      const res = await this.$axios.post('/api/users/login', user)
      localStorage.setItem('proshop-token', JSON.stringify(res.data.token))
      return res
    } catch (error) {
      return error
    }
  },
  async register(context, user) {
    try {
      const res = await this.$axios.post('/api/users', user)
      localStorage.setItem('proshop-token', JSON.stringify(res.data.token))
      return res
    } catch (error) {
      return error
    }
  },
  async updateUser(context, user) {
    try {
      const token = JSON.parse(localStorage.getItem('proshop-token'))
      const res = await this.$axios.put('/api/users/profile', user, { headers: { 'Authorization': `Bearer ${token}` } })
      return res
    } catch (error) {
      return error
    }
  }
}
