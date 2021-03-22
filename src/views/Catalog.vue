<template>
  <div class="about">
    <h1>Catalog</h1>
    <b-container>


      <ProductCard :products="allProducts"/>
    </b-container>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex"
import ProductCard from "@/components/ProductCard"
export default {


  name: "Catalog",
  components: {ProductCard},
  // data(){
  // return {
  //   products:[]
  // }
  // },
  computed: {
    ...mapGetters(["allProducts"]),
    ...mapState(["products"]),
    async products(){
      //  this.products = this.store.state.products
      return this.allProducts
    },
    async Products() {
      console.log("Getter",this.$store)
    }
  },
  methods: {

  }

}

</script>