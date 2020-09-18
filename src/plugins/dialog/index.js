import DialogService from './DialogService';

/**
 * Plugin responsável por injetar o Dialog service na instancia do Vue
 */
export default {
  install(Vue) {
    Vue.$dialog = DialogService;
    Vue.prototype.$dialog = DialogService;
  },
};
