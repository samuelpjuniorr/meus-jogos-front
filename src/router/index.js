import Vue from 'vue';
import Router from 'vue-router';


import Login from '@/pages/auth/Login';
import Main from '@/components/layout/Main';
import NotAuthorized from '@/pages/auth/NotAuthorized';
import authenticationGuard from './guards/AuthenticationGuard';
import authorizationGuard from './guards/AuthorizationGuard';

import adminRoutes from './AdminRoutes';
import authenticatedRoutes from './AuthenticatedRoutes';

Vue.use(Router);

// Agrupamento de todas as rotas
// Todas as rotas devem ser registradas com nome
// Estes nomes são utilizados no de/para com os itens de menu
const routes = [
  {
    path: '',
    name: 'login',
    component: Login,
  },
  {
    path: '/app',
    component: Main,
    children: [
      {
        path: 'not-authorized',
        name: 'not-authorized',
        component: NotAuthorized,
      },
      ...adminRoutes,
      ...authenticatedRoutes,
    ],
  },
];

const router = new Router({
  routes,
});

// em todas as rotas é verificado autenticação e autorização
router.beforeEach((to, from, next) => {
  // move o scroll para o inicio da tela
  window.scrollTo(0, 0);
  authenticationGuard(to, from, next);
  authorizationGuard(to, from, next);
});

export default router;
