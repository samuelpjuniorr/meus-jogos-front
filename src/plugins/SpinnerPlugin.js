
/**
 * Plugin responsável por controlar a exibição do component PrSpinner
 */
export default {
  install(Vue) {
    const plugin = new Vue({
      data() { // declaração de variáveis
        return {
          visible: false,
        };
      },
      methods: { // Declaração dos métodos
        show() {
          this.visible = true;
        },
        hide() {
          this.visible = false;
        },
      },
    });

    Vue.$spinner = plugin;
    Vue.prototype.$spinner = plugin;
  },
};
