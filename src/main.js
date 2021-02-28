/**
 * External dependencies.
 */
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

/**
 * Internal dependencies.
 */
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
    render: h => h(App),
}).$mount('#app');
