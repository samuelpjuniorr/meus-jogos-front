
import store from '@/store';

/**
 * TODO Este evento é responsável por verificar o controle de autenticação
 * na transição de páginas
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const beforeEach = (to, from, next) => {
  // Verifica se a rota requer autenticação ou algum perfil especifico
  // se requerer o usuário deverá estar logado para continuar a rota
  if ((to.meta.requiresAuth || to.meta.requireRoles) && !store.state.currentUser) {
    next('/');
    // Se o usuário estiver logado e tentar ir para a página de login ele vai ser direcionado
    // paga página inicial
  } else if (to.name === 'login' && store.state.currentUser) {
    // TODO Mudar para constante de HomePage
    next({ name: 'home' });
  } else {
    next();
  }
};

export default beforeEach;
