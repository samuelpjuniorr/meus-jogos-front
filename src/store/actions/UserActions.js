import axios from 'axios';
import * as types from '../MutationTypes';

/**
 * Action responsável por operações
 * relacionadas ao registro e recuperação
 * de usuários
 */

export default {
  /**
   * Atualiza o profile do usuário
   *
   * @param {*} commit, função derivada do contexto da store
   * @param {*} user, dados do usuário
   */
  updateProfile({ commit }, user) {
    return axios.put('profile', user).then(({ data }) => {
      commit(types.UPDATE_USER, data);

      return data;
    });
  },
  /**
   * Envia email com informações para recuperar senha
   *
   * @param {*} commit, função derivada do contexto da store
   * @param {*} email, email do usuário que quer recuperar a senha
   */
  // eslint-disable-next-line
  recoverPassword({ commit }, email) {
    return axios.post('password/email', email).then(({ data }) => data);
  },
  /**
   * Redefine a senha do usuário
   *
   * @param {*} commit, função derivada do contexto da store
   * @param {*} reset, dados para redefinir a senha
   */
  // eslint-disable-next-line
  sendReset({ commit }, reset) {
    return axios.post('/password/reset', reset).then(({ data }) => data);
  },
};
