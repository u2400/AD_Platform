import Vue from "vue";
import VueRouter from 'vue-router';
import WorkspaceManage from "./components/WorkspaceManage.vue";
import PageHeader from "./components/PageHeader/PageHeader.vue";

const routes = [
    {
        path: '/test', component: WorkspaceManage
    },
    {
        path: '/header', components: {
            header: PageHeader
        }
    }
]

Vue.use(VueRouter)

export default new VueRouter({
    routes: routes
});