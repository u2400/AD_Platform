<template>
  <main-layout>
    <router-view slot="header" name="header"></router-view>
    <router-view slot="body" name="body"></router-view>
  </main-layout>
</template>


<script>
import MainLayout from "./components/MainLayout.vue";

export default {
  components: {
    "main-layout": MainLayout
  },
  name : "app",
  data(){
    return {
      collapsed: false,
    }
  },
}
</script>