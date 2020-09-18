import Vue from 'vue';
import Audit from '@/features/audit/Audit';
import Mail from '@/features/mail/Mail';
import UserList from '@/features/user/UserList';
import UserForm from '@/features/user/UserForm';

Vue.component('audit', Audit);
Vue.component('audit', Mail);
Vue.component('user-list', UserList);

export default [
  {
    path: 'audit',
    name: 'audit',
    component: Audit,
    meta: { requiresAuth: true },
  },
  {
    path: 'mail',
    name: 'mail',
    component: Mail,
    meta: { requiresAuth: true },
  },
  {
    path: 'user',
    name: 'user-list',
    component: UserList,
    meta: { requiresAuth: true },
  },
  {
    path: 'user/:id',
    name: 'user-form',
    component: UserForm,
    meta: { requiresAuth: true },
  },
];
