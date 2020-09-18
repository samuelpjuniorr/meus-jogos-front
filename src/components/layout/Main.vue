<template>
  <v-app light>

    <header-nav></header-nav>

    <v-content>

      <v-container fluid grid-list-md >

        <router-view></router-view>

      </v-container>
    </v-content>

  </v-app>
</template>

<script>

import { Global } from '@/Config';
import HeaderNav from './HeaderNav';

// Este component centraliza os componentes de layout do sistema
export default {
  components: {// Declaração de componentes
    HeaderNav,
  },
  name: 'Main',
  data() { // declaração de variáveis
    return {
      fixed: false,
      info: Global.info,
    };
  },
};
</script>

<style scoped>
  .footer {
    padding-left: 10px;
  }
</style>
