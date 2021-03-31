<template>
  <div class="about">
    <h1>Catalog</h1>
    <b-container>


<!--      <ProductCard :products="allProducts"/>-->

      <b-button @click="products"> GET the shit</b-button>

      <img v-if="this.url" :src="this.url" alt="">
    </b-container>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from "vuex"
import ProductCard from "@/components/ProductCard"
import addButton from "../components/addButton";
import AddButton from "../components/addButton";
import {storageRef} from "../firebase/firebase";
export default {


  name: "Catalog",
  components: {AddButton, ProductCard},
  data(){
  return {
    product: null,
    url:null
  }
  },
  computed: {
    ...mapGetters(["allProducts"]),
    // url(){
    //   return this.url
    // }

  },
  methods: {
    ...mapActions(["getProducts"]),
    async products(){

     await this.getProducts()

    },
  }

}

</script>