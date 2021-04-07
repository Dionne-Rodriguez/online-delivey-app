import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import {db, catalogReference, storageRef, auth} from "../firebase/firebase"
import {firestoreAction, vuexfireMutations} from "vuexfire";



const axios = require("axios")

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState( { storage: window.sessionStorage })],
  state: {
    products: []
  },
  mutations: {
      ...vuexfireMutations,
    setProducts: (state, products) =>  {(
                state.products = products

    )}
  },
  actions: {
    async addProduct({commit}, product) {
         await catalogReference.add(product)
             .then(() => {
                 console.log("Product Successfully Uploaded!")
             })
    },
    async handleSignUp({commit}, credentials) {
        console.log("handling....")
        return new Promise( async (resolve, reject) => {
     await auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
         .then(() => {
             resolve({
                 message:"Email Sign Up Successful 😎",
                     code: 200
                 })
         })
         .catch((err) => reject({error:err,
         code:400}))
        })
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
      bindProducts: firestoreAction(({ bindFirestoreRef }) => {
          return bindFirestoreRef('products', db.collection('catalog'))
      }),
      unbindProducts: firestoreAction(({ unbindFirestoreRef }) => {
          unbindFirestoreRef('todos')
      })
  },
  getters: {
    allProducts: state => {
      return state.products }
  },

})


