import axios from 'axios';
import * as types from '../MutationTypes';

/**
 * Action responsável por
 * operações de login/logout
 */

export default {
  /**
   * Realiza o login do sistema e guarda as informações
   * do usuário e token
   *
   * @param {*} commit, função derivada do contexto da store
   * @param {*} credentials usuario e senha do usuário
   */
  login({ commit }, credentials) {
    return axios.post('usuario/login', credentials)
      .then((response) => {
        commit(types.UPDATE_USER, { ...response.data,
        } );

        commit(types.UPDATE_TOKEN, response.data.token);

        return response.user;
      });
  },
  /**
   * Realiza o logout do sistema, para isso basta apagar todas as informações
   * do state que são relativas a autenticação
   * @param {*} commit, função derivada do contexto da store
   */
  logout({ commit }) {
    commit(types.UPDATE_USER, null);
    commit(types.UPDATE_TOKEN, null);
  },
};
