import Vue from 'vue';

import Vue2Filters from 'vue2-filters';
import TAttr from './TAttrFilter';

/**
 * Encapsula todos os filtros globais utilizados no sistema
 * Filtros criados e plugins especificos de filtros
 */
Vue.filter('tAttr', TAttr);

Vue.use(Vue2Filters);

