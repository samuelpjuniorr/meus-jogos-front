<template>
  <div class="teste">
    <v-progress-linear color="red" class='spinner' :indeterminate="true"
    :active="$spinner.visible"></v-progress-linear>
    <router-view></router-view>
    <pr-toast :timeout="5000" :register="'prodeb'" v-model="$toast.visible['prodeb']"></pr-toast>
  </div>
</template>

<script>
export default {
  /**
     * Componente principal da aplicação.
     * Nele fica concentrado os componentes que tem uma única instancia como ex:
     * Toast, Progress Bar
     */
  data() { // declaração de variáveis
    return {

    };
  },
};
</script>

<style>
  .spinner {
    position: absolute;
    top: 0;
    z-index: 999999998;
    margin: 0 !important;
  }

  .toast {
    z-index: 999999999;
  }

  .toast div.snack__content {
    height: intrinsic !important;           /* Safari/WebKit uses a non-standard name */
    height: -moz-max-content !important;    /* Firefox/Gecko */
    height: -webkit-max-content !important; /* Chrome */
    display: table;
  }

  .toast div.snack__content .toast-wrapper {
    display: table-row;
  }

  .toast div.snack__content .toast-wrapper .toast-message {
    display: table-cell;
  }

  .toast div.snack__content .toast-wrapper .toast-btn-close {
    text-align: right;
  }
</style>
