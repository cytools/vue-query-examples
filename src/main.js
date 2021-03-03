/**
 * External dependencies.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCompositionApi from '@vue/composition-api';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

/**
 * Internal dependencies.
 */
import App from './App.vue';
import People from './components/people/people';
import Person from './components/person/person';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);

const routes = [
    {
        name: 'person',
        path: '/person/:id',
        component: Person,
        props: true,
    },
    {
        path: '/',
        component: People,
    },
];
const router = new VueRouter({
    routes,
    mode: 'history',
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
