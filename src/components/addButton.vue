<template>
  <b-button @click="addProduct(e)">hit</b-button>
</template>

<script>
export default {
name: "addButton",
  methods:{
  addProduct(event){
    console.log("event", event)
  }
  }
}
</script>

<style scoped>

</style>