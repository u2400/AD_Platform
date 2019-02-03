
<template>
  <main-layout>123</main-layout>
</template>


<script>
import MainLayout from "./components/MainLayout.vue"

export default {
  components: {
    "main-layout" : MainLayout,
  },
  name : "app",
  data(){
    return {
      collapsed: false,
    }
  },
}
</script>



