<template>
  <div class="home">
    <h1>Add a product</h1>
<form action=""  v-on:submit.prevent="onSubmit">
<input data-product-title v-model="title" type="text" placeholder="title">
<input data-product-description v-model="description" type="text" placeholder="Description">
<input data-stock-number v-model="stock" type="number" placeholder="stock">
<input @change="handleFile" type="file">
<button data-next @click="onSubmit">Submit</button>


</form>

     
  </div>
</template>

<script>
// @ is an alias to /src

import {mapState, mapMutations} from 'vuex'


export default {
  name: "AddProduct",
  data(){
    return {
    title: "",
    description: "",
    stock:0,
   attachment: null
    }
  },
  components: {
   
    
  },
  computed:{
    ...mapState([
      "product"
    ]),
  },
  methods: {
    ...mapMutations(["setProduct"]),
    onSubmit() {
      console.log("should be in the onsubmit")

      this.setProduct([{
        title: this.title,
        description: this.description,
        stock: this.stock
      }])
      

    },
    handleFile(event){
      console.log(event.target.files);
      this.attachment = event.target.files.name
      
    }
  }
};
</script>
