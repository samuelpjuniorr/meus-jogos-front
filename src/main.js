/* eslint-disable no-new */

import Vue from 'vue';
import axios from 'axios';
import inject from './VueInstanceInject';
import './stylus/main.styl';

import './Config';
import './plugins';
import './filters';

import App from './App';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

// Caso precise injetar algo na instancia root do Vue
// utilize o arquivo @/vue-instance-inject
new Vue({
  el: '#app',
  ...inject,
  template: '<v-app><App/></v-app>',
  components: {// Declaração de componentes
    App },
});


// eslint-disable-next-line
import './interceptors';
