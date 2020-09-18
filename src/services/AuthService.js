import store from '@/store';


export default class AuthService {
  /**
   * Serviço especifico para realizar o login do sistema
   * @param {*} credentials objeto login e senha.
   */
  static login(credentials) {
    return store.dispatch('login', credentials);
  }
}
