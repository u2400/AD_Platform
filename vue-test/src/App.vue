
<template>
  <main-layout>
    <router-view></router-view>
  </main-layout>
</template>


<script>
import MainLayout from "./components/MainLayout.vue";
import WorkspaceManage from "./components/WorkspaceManage.vue";
import PageHeader from "./components/PageHeader/PageHeader.vue";

export default {
  components: {
    "main-layout": MainLayout,
    "WorkspaceManage": WorkspaceManage,
    "PageHeader": PageHeader
  },
  name : "app",
  data(){
    return {
      collapsed: false,
    }
  },
}
</script>



