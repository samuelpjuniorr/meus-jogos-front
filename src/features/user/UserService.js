import { map as _map, intersection as _intersection } from 'lodash';
import { BaseService } from 'vue-prodeb';

export default class UserService extends BaseService {
  constructor() {
    super('users');
  }

  /**
   * Verifica se o usuário tem o(s) perfil(s) solicitado
   *
   * @param {*} user usuário que vai ser verificado
   * @param {*} roles perfils a serem verificados, pode ser um array contendo vários ou
   * uma string contendo um único perfil
   * @param {*} all determina se é para checar se o usuário tem todos ou algum,
   * true para todos, false paga algum
   */
  static hasProfile(user, roles, all = false) {
    // eslint-disable-next-line
    roles = Array.isArray(roles) ? roles : [roles];

    const userRoles = _map(user.roles, 'permissao');

    if (all) {
      return _intersection(userRoles, roles).length === roles.length;
    }

    return _intersection(userRoles, roles).length;
  }
}
