import Vue from 'vue';
import Entry from './Entry.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(Entry),
}).$mount('#app');
