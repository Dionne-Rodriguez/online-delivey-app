<template>
  <div class="page">
    <h1>Add a products</h1>
    <form class="form"v-on:submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="input-section">
        <h3 class="mt-6">Title</h3>
      <input data-product-title v-model="title" type="text" placeholder="Title">
      </div>
      <div class="input-section">
      <h3>Description</h3>
      <input data-product-description v-model="description" type="text" placeholder="Description">
      </div>

      <div class="input-section">
      <h3>Type</h3>
      <b-form-select size="lg" v-model="selectedType" :options="types"></b-form-select>
      </div>

      <div class="input-section">
      <h3>Stock Amount</h3>
      <input data-stock-number v-model="stock" type="number" placeholder="stock">
      </div>


      <b-container class="dropImageSection" v-cloak @drop.prevent="addFile" @dragover.prevent>
        <h2 class="mt-6">Files to Upload (Drag them over)</h2>
        <div class="file-drop">
          <h3>drop files here</h3>

           <img @click="onPickFile" src="../assets/uploadIcon.png" alt="uploadAndReturnDownLoadUrl">
          <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="handleFile"/>

        </div>
      </b-container>
        <ul>
          <li v-for="file in file">
            {{ file.name }} ({{ file.size  }}) <button @click="removeFile(file)" title="Remove">X</button>
          </li>
        </ul>

      <b-button variant="dark" class="btn" @click="onSubmit">Submit</b-button>

    </form>


  </div>
</template>

<script>

import {mapActions} from 'vuex'


export default {
  name: "AddProduct",
  data(){
    return {
      title: "",
      description: "",
      stock:"0",
      file: null,
      selectedType:null,
      types: [
        { value: null, text: 'Please select a product category' },
        { value: 'Pre-Rolls', text: 'Pre-Rolls' },
        { value: 'Flower', text: 'Flower' },
        { value: 'Vaporizers', text: 'Vaporizers' },
        { value: 'Concentrates', text: 'Concentrates' },
        { value: 'Edibles', text: 'Edibles'}
      ]
    }
  },
  components: {},
  computed:{},
  methods: {
    ...mapActions(["addProduct", "uploadAndReturnDownLoadUrl"]),
    onPickFile() {
      this.$refs.fileInput.click()
    },
    addFile(e) {
      let droppedFiles = e.dataTransfer.files;
      if(!droppedFiles) return;
      ([...droppedFiles]).forEach(f => {
        this.file = f;
      });
    },
    removeFile(file){
      this.file = this.file.filter(f => {
        return f != file;
      });
    },
    onSubmit() {
      if(this.file){
     this.uploadAndReturnDownLoadUrl(this.file)
        .then((url) => {
          if (this.title){
            this.addProduct({
              title: this.title,
              description: this.description,
              type:this.selectedType,
              stock: this.stock.toString(),
              imageUrl: url
            })
          }

        })
      }

    },
    handleFile(){
      this.file = this.$refs.fileInput.files[0]
      console.log("picked file",this.file )
    }
  }
};
</script>

<style lang="scss">
.dropImageSection{
  margin-top: 60px;
}

.btn {
  width: 20%;
  align-self: flex-end;
  margin-top: 80px;
}

.page {
  margin: 0% 15%;
}

.form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  text-align: left;
  margin-bottom: 200px;

  input {
    width: 100%;
    border-radius: 5px;
    height: 48px;
    padding: 1%;
    border: 1px solid lightgrey;
  }

  .input-section {
    width: 55%;
    margin: 2%;
  }
}
.file-drop{
  height:200px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid
}

.file-drop img {
  height:50px;
  width: 50px;
}

.file-drop h3 {
  margin-top:28px;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>