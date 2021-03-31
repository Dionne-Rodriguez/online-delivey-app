import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import {db, catalogReference,  storageRef} from "../firebase/firebase"

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
         await catalogReference.add(product)
             .then(() => {
                 console.log("Product Successfully Uploaded!")
             })
      //commit("setProduct", product)
    },
    async uploadAndReturnDownLoadUrl({commit}, file) {
        return new Promise(async (resolve, reject) =>{
await storageRef.child("catalog/" + file.name).put(file).then(async() => {
    console.log('Uploaded a blob or file!');
    await storageRef.child("catalog/" + file.name).getDownloadURL()
        .then((url) => {
            resolve(url)
        })
});
        })
    },
      async getProducts({commit}) {
          return new Promise(async (resolve, reject) => {
              await catalogReference.get()
                  .then((docs) => {
                   resolve(docs.docs.map(doc => doc.data()))
                  })
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

