import Vue from "vue";
import VueRouter from 'vue-router';
import WorkspaceManage from "./components/WorkspaceManage.vue";
import PageHeader from "./components/PageHeader/PageHeader.vue";
import PageHeaderConetent from "./components/PageHeader/PageHeader.json";
import Exception from "./components/exception/exception.vue";
import Body from "./components/body/body.vue";
import ExceptionContent from "./components/exception/exception.json";

const routes = [
    {
        path: '/workspacemanage', 
        components: {
            body: Body,
        },
        children:[
            { path: "", component: WorkspaceManage }
        ],
    },
    {
        path: '/header', components: {
            header: PageHeader
        },
        props: {
            header: PageHeaderConetent['test']
        }
    },
    {
        path: "*", components: {
            body: Exception,
        },
        props: {
            body: ExceptionContent['404'],
        }
    }
]

Vue.use(VueRouter)

export default new VueRouter({
    routes: routes
});