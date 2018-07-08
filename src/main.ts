import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "vue-di-kit";
Vue.use(VueRouter);
Vue.config.devtools = true;
const router = new VueRouter({routes, mode: 'history'})

let app = new Vue({
    el: '#app',
    data: { name: 'Vue DI Template'},
    template: `
    <div>
        <app-component />
    </div>
    `,
    router
});