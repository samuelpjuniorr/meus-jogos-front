import * as types from './MutationTypes';

// Declaração de todos os mutations
export default {
  // Mutation responsável por atualização do usuário logado
  [types.UPDATE_USER](state, payload) {
    state.currentUser = payload;
  },

  // Mutation responsável por atualização da unidade/orgao do usuário logado
  [types.UPDATE_USER_UNIDADE](state, payload) {
    state.currentUserUnidade = payload;
  },

  // Mutation responsável por atualização do token atual
  [types.UPDATE_TOKEN](state, payload) {
    state.token = payload;
  },

  // Mutation responsável por atualização da desautorização de registro ponto do usuário atual
  [types.UPDATE_DESAUTORIZACAO_REGISTRO_PONTO](state, payload) {
    state.desautorizacaoRegistroPonto = payload;
  },

};
