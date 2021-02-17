/**
 * External dependencies.
 */
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

/**
 * Internal dependencies.
 */
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
    render: h => h(App),
}).$mount('#app');
