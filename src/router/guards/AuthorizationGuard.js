
import store from '@/store';
import UserService from '@/features/user/UserService';

/**
 * TODO Este evento é responsável por verificar o controle de autorização
 * na transição de páginas
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const beforeEach = (to, from, next) => {
  if (store.state.currentUser
    && to.meta.requireRoles
    && !UserService.hasProfile(store.state.currentUser, to.meta.requireRoles)) {
    next({ name: 'not-authorized' });
  } else {
    next();
  }
};

export default beforeEach;
