import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import mutations from './Mutations';
import getters from './Getters';

import actions from './actions';

Vue.use(Vuex);

// Declaração da Store do sistema
// Nesta store deve ser colocada todas as informações que são compartilhadas entre
// todos os componentes

const store = new Vuex.Store({
  state: {
    currentUser: null,
    currentUserUnidade: null,
    token: null,
    desautorizacaoRegistroPonto: null,
  },
  plugins: [
    // Plugin utilizado para persistir o state da store no localstorage
    createPersistedState(),
  ],
  mutations,
  actions,
  getters,
});

export default store;
