<template>
  <div class="about">
    <nav-bar />
    <h1>Catalog</h1>
    <b-container>
      <ProductCard :products="this.allProducts()"/>

<!--      <b-button @click="getAllProducts"> GET the shit</b-button>-->


    </b-container>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from "vuex"
import ProductCard from "@/components/ProductCard"
import navBar from "@/components/navBar";
import NavBar from "../components/navBar";

export default {


  name: "Catalog",
  components: {NavBar, ProductCard},
  data(){
  return {
    types: [{
      "flower": null,
      "vapes":null,
      "edibles":null,
      "concentrates":null,
      "pre-rolls":null

    }

    ]
  }
  },
  computed: {

  },
  methods: {
    ...mapGetters(["allProducts"]),
    ...mapActions(["bindProducts"])

  },
  mounted() {
    this.bindProducts()
  }

}

</script>