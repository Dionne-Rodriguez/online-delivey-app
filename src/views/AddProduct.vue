<template>
  <div class="home">
    <h1>Add a product</h1>
<form action="" v-on:submit.prevent="onSubmit">
<input v-model="title" type="text" placeholder="title">
<input v-model="description" type="text" placeholder="Description">
<input v-model="stock" type="number" placeholder="stock">
<input @change="handleFile" type="file">
<button>Submit</button>


</form>

<!-- <img src="{{renderImage}}" alt=""> -->
<h2>{{renderImage}}</h2>
     
  </div>
</template>

<script>
// @ is an alias to /src

import {mapState} from 'vuex'

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
    product() {
      return this.product;
    },
 renderImage() {
      return this.attachment || ""
    }
  },
  methods: {
    onSubmit() {
      console.log("clicked");
      
      //set some type of object and save it to the state
    console.log(this.title);
    

      console.log('state',this.product.title);
      

    },
    handleFile(event){
      console.log(event.target.files);
      this.attachment = event.target.files.name
      
    }
  }
};
</script>
