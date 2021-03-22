<template>
  <div class="home">
    <h1>Add a product</h1>
    <form v-on:submit.prevent="onSubmit" enctype="multipart/form-data">

      <input data-product-title v-model="title" type="text" placeholder="title">
      <input data-product-description v-model="description" type="text" placeholder="Description">
      <input data-product-type v-model="type" type="text" placeholder="type">
      <input data-stock-number v-model="stock" type="number" placeholder="stock">
      <b-container class="mb-4" v-cloak @drop.prevent="addFile" @dragover.prevent>
        <h2 class="mt-6">Files to Upload (Drag them over)</h2>
        <div class="file-drop">
          <h3>drop files here</h3>
        </div>
        <ul>
          <li v-for="file in file">
            {{ file.name }} ({{ file.size  }}) <button @click="removeFile(file)" title="Remove">X</button>
          </li>
        </ul>
      </b-container>
      <input @change="handleFile" type="file" ref="fileInput" >
      <button data-next @submit="onSubmit">Submit</button>

      <p>check out the product in the products page!</p>
    </form>


  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'


export default {
  name: "AddProduct",
  data(){
    return {
      title: "",
      description: "",
      stock:"0",
      file: null,
      type:""
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
    ...mapActions(["addProduct", "upload"]),
    onPickImageFileInput() {
      this.$refs.fileInput.click()
    },
    // onFilePicked(event) {
    //   const files = event.target.files
    //   console.log("files",files)
    // },
    addFile(e) {
      let droppedFiles = e.dataTransfer.files;
      if(!droppedFiles) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      ([...droppedFiles]).forEach(f => {
        console.log("dropped image",f)
        this.file = f;
      });
      console.log(this.file)
    },
    removeFile(file){
      this.file = this.file.filter(f => {
        return f != file;
      });
    },
    onSubmit() {
      const formData = new FormData()
      formData.append('file', "this.file")

      this.upload(formData)

      this.addProduct({
        title: this.title,
        description: this.description,
        type:this.type,
        stock: this.stock.toString(),
        file: formData
      })


    },
    handleFile(event){
      console.log("file ref", )
      this.file = this.$refs.fileInput.files[0]
    }
  }
};
</script>

<style>
.file-drop{
  height:150px;
  border: 1px solid
}

.file-drop h3 {
  margin-top:28px;
}
</style>