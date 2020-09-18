<template>
  <div>
    <v-navigation-drawer :fixed="true" :dark="$theme.menu.darkMode" :class="$theme.menu.bodyClass"
      :clipped="clipped" v-model="drawer" app>
      <menu-side-bar></menu-side-bar>
    </v-navigation-drawer>

    <v-toolbar app :clipped-left="clipped"  class="elevation-1">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title id="toolbarTitle" v-text="translateTitle"></v-toolbar-title>

      <v-spacer></v-spacer>

     <!-- <v-tooltip bottom>
        <v-btn :to="{name: 'profile'}" icon slot="activator">
          <v-icon color="black">account_box</v-icon>
        </v-btn>
        <span>Perfil</span>
      </v-tooltip> -->

      <v-tooltip bottom>
        <v-btn @click="logout()" icon slot="activator">
          <v-icon color="black">power_settings_new</v-icon>
        </v-btn>
        <span>Sair</span>
      </v-tooltip>
    </v-toolbar>
  </div>
</template>

<script>
import MenuSideBar from './MenuSideBar';
import UtilService from '@/services/UtilService'; // Arquivo com métodos gerais

export default {
  name: 'header-nav',
  components: {// Declaração de componentes
    MenuSideBar,
  },
  data() { // declaração de variáveis
    return {
      title: this.$router.currentRoute.name,
      clipped: false,
      drawer: true,
    };
  },
  watch: { // Declaracao de propriedades assistidas
    /**
       * Metodo responsavel por atribuir o titulo atraves da route.
       */
    $route(to) {
      this.title = to.name;
    },
  },
  computed: { //Campos computados
    /**
       * Método responsavel por traduzir o title.
       */
    translateTitle() {
      return this.$t(`views.breadcrumbs.${this.title}`);
    },
  },
  methods: { // Declaração dos métodos
    /**
       * Metodo responsavel por efetuar o logout da aplicacao.
       * Dispara um evento para limpar o cache.
       */
    logout() {
      // Limpa o localStorage ao deslogar
      UtilService.LimparLocalStorage();

      this.$store.dispatch('logout');
      this.$toast.success('Deslogado com sucesso');
      this.$router.replace('/');
    },
  },
};

</script>
