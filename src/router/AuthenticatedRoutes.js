
import Home from '@/pages/home/Home';

import Amigo from '@/pages/Amigo';
import Jogo from '@/pages/Jogo';

export default [
  {
    path: '',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: 'amigo',
    name: 'amigo',
    component: Amigo,
    meta: { requiresAuth: true },
  },
  {
    path: 'jogo',
    name: 'jogo',
    component: Jogo,
    meta: { requiresAuth: true },
  },

];
