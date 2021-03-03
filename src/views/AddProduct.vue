<template>
  <div class="home">
    <b-container>
      <h1>Add a product</h1>
      <form action v-on:submit.prevent="onSubmit">
        <b-button @click="onSubmit">Submit</b-button>
        <b-form-input v-model="title" placeholder="Title"></b-form-input>

        <b-form-textarea
          id="textarea"
          v-model="description"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>

        <input v-model="stock" type="number" placeholder="stock" />

        <b-form-file
          v-model="file1"
          :state="Boolean(file1)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div>
      </form>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from "vuex";

export default {
  name: "AddProduct",
  data() {
    return {
      title: "",
      description: "",
      stock: 0,
      attachment: null,
      file1: null,
      file2: null
    };
  },
  components: {},
  computed: {
    ...mapState(["product"]),
    product() {
      return this.product;
    },
    renderImage() {
      return this.attachment || "";
    }
  },
  methods: {
    onSubmit() {
      console.log("clicked");

      //set some type of object and save it to the state

      let product = {
        title: this.title,
        description: this.description,
        stock: this.stock,
        file1: this.file1,
        file2: this.file2
      };

      console.log(product);

      this.addProduct(product);
    },
    handleFile(event) {
      console.log(event.target.files);
      this.attachment = event.target.files.name;
    }
  }
};
</script>
