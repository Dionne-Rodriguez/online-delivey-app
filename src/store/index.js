import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

const axios = require("axios")

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState( { storage: window.sessionStorage })],
  state: {
    products: []
  },
  mutations: {
    setProduct: (state, product) =>  (
        state.products.unshift(product)
    )
  },
  actions: {
    async addProduct({commit}, product) {
      await axios.post(`${process.env.VUE_APP_BACKEND_URL}/addProduct`, product)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      commit("setProduct", product)
    },
    async upload({commit}, formData) {
      await axios.post(`${process.env.VUE_APP_BACKEND_URL}/upload`, formData)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })

    },
  },
  getters: {
    //needs setup
    allProducts: state => {
      console.log("from index.js ", state)
      return state.products }
  },

})

