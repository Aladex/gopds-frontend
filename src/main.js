import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import Axios from 'axios'
import VueClipboard from 'vue-clipboard2'


Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.use(VueClipboard);

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app');
