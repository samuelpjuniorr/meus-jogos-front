<template>
  <v-list dense class="main-menu">
    <v-layout row wrap :class="[$theme.menu.headerClass, 'elevation-2', 'menu-header']">
      <v-flex xs12>
        <router-link :to="{ name: 'home' }" class="avatarWrapper">
          <div :style="{'background-image': 'url(' + avatar + ')'}"
            class="avatar elevation-2"></div>
        </router-link>
      </v-flex>
      <v-flex xs12 class="d-flex align-center mb-6 px-2">
        <div class="box-contato">
          <b> {{$store.state.currentUser.nome}} </b>
        </div>
      </v-flex>
    </v-layout>
    <template v-for="item in preparedItems" v-if="item.hasPermission">
      <v-list-group
        v-if="item.items.length"
        :value="item.active"
        :key="item.title"
        :active-class="$theme.menu.darkMode ? 'white--text' : 'grey--text text--darken-2'"
        :prepend-icon="item.icon">
        <v-list-tile slot="activator" :to="item.path == '#' ? '' : item.path" :exact="item.exact"
          :active-class="$theme.menu.activeItemClass">
          <v-list-tile-content>
            <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="subItem in item.items" :exact="false" :key="subItem.title"
          :to="subItem.path"
          v-if="subItem.hasPermission"
          class="menu-sub-item"
          :active-class="$theme.menu.activeItemClass"
          @click="removeItensLocalStorage()">
          <v-list-tile-action>
            <v-icon>{{ subItem.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t(subItem.title) }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-tile v-else :key="item.title" :to="item.path == '#' ? '' : item.path"
        :exact="item.exact"
        :active-class="$theme.menu.activeItemClass"
        @click="removeItensLocalStorage()">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>
<script>

import router from '@/router';
import UserService from '@/features/user/UserService';
import imgNoAvatar from '@/assets/no_avatar.gif';
import menuItems from './MenuItems';
import UtilService from '@/services/UtilService'; // Arquivo com métodos gerais

export default {
  name: 'menu-side-bar',
  created() { /*Metodo de start do componente*/
    this.preparedItems = this.prepareMenuItems(menuItems);
  },
  computed: { //Campos computados
    /**
     * Metodo responsavel por montar avatar do usuario.
     */
    avatar() {
      return this.$store.state.currentUser.image ?
        this.$store.state.currentUser.image : imgNoAvatar;
    },
  },
  methods: { // Declaração dos métodos
    /**
     *  Prepara o item de menus pegando informações das rotas dentro de /app
     */
    prepareMenuItems(itemsOrder) {
      const data = [];
      // pega as rotas que estão dentro do main
      const mainRoute = router.options.routes.find(routerItem =>
        routerItem.path === '/app');
      const mainChildrenRoutes = mainRoute.children;
      itemsOrder.forEach((itemMenu) => {
        const preparedItem = this.mergeItemWithRouter(
          mainChildrenRoutes,
          Object.assign({}, itemMenu),
        );
        preparedItem.items = [];
        itemMenu.items.forEach((subItemMenu) => {
          preparedItem.items.push(this.mergeItemWithRouter(
            mainChildrenRoutes,
            Object.assign({}, subItemMenu),
          ));
        });
        data.push(preparedItem);
      });
      return data;
    },
    /**
     * Metodo que faz o merge das informações contida no roteamento com as informações
     * contidas na declaração dos itens de menu
     */
    mergeItemWithRouter(mainChildrenRoutes, item) {
      const menuPrefix = 'views.layout.menu.';
      let routerMatched;
      item.title = `${menuPrefix}${item.name}`;
      item.exact = true;
      if (item.requireRoles) {
        item.hasPermission = UserService.hasProfile(
          this.$store.state.currentUser,
          item.requireRoles,
        );
      } else {
        item.hasPermission = true;
      }
      mainChildrenRoutes.find((routerItem) => {
        const found = item.name === routerItem.name;
        if (found) {
          routerMatched = Object.assign({}, routerItem, { path: `/app/${routerItem.path}` });
          return true;
        }
        return false;
      });
      if (routerMatched) {
        let hasPermission = true;
        if (routerMatched.meta.requireRoles) {
          hasPermission = UserService.hasProfile(
            this.$store.state.currentUser,
            routerMatched.meta.requireRoles,
          );
        }
        // eslint-disable-next-line
        item = Object.assign({}, item, {
          path: routerMatched.path,
          hasPermission,
        });
      }
      return item;
    },
    removeItensLocalStorage() {
      UtilService.RemoverItensLocalStorage();
    }
  },
  data() { // declaração de variáveis
    return {
      preparedItems: [],
    };
  },
};
</script>
<style scoped>
  .avatarWrapper {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0 16px;
    margin: 0 auto;
  }
  .textAvatar {
    padding: 16px 0 16px;
    margin: 0 auto;
  }
  .avatarWrapper .avatar {
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    border-radius: 50%;
    width: 65px;
    height: 65px;
  }
  .menu-sub-item {
    padding-left: 20px !important;
  }
  .menu-header {
    padding-bottom: 10px !important;
    margin-bottom: 5px !important;
  }
  .main-menu {
    padding-top: 0px;
  }
  .menu-logo {
    padding-top:10px;
    font-size: 35px;
  }
  .menu-logo span {
    font-family: 'Arial';
  }
  .ep-email {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-contato {
    width: 100%;
  }
</style>
