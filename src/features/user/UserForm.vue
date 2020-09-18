<template>
  <v-form @submit.prevent="save" novalidate id="form-user">
    <pr-box :title="titleBox">

      <div slot="buttons-header">
        <v-btn icon @click.native="goToList">
          <v-icon color="white">list</v-icon>
        </v-btn>
      </div>

      <v-text-field label="Nome" id="name" v-model="resource.name" :counter="100"
        :error-messages="validationErrors.name">
      </v-text-field>

      <v-text-field label="Email" id="email" v-model="resource.email" :counter="100"
        :error-messages="validationErrors.email">
      </v-text-field>

      <v-select
        v-model="resource.roles"
        label="Permissões"
        multiple
        item-value="id"
        item-text="title"
        id="roles"
        return-object
        chips
        :items="roles"></v-select>

      <div slot="buttons-footer">
        <v-btn flat type="submit" id="button-user-save" color="primary"
          :loading="savelLoading">Salvar</v-btn>
      </div>
    </pr-box>
  </v-form>
</template>

<script>
import { CrudMixin } from 'vue-prodeb'; // CrudMixin do Starter Pack
import UserService from '@/features/user/UserService';
import RoleService from '@/features/role/RoleService';

export default {
  name: 'user-form',
  mixins: [CrudMixin], // inicializando o CrudMixin criado pelo Starter Pack
  data() { // declaração de variáveis
    return {
      roles: [],
      selectedRoles: [],
      roleService: new RoleService(),
    };
  },
  methods: { // Declaração dos métodos
    initCrud() {
      this.serviceType = UserService;
      this.routerName = 'user';
      this.componentType = 'FORM';

      this.roleService.query().then((data) => { this.roles = data; });
    },
  },
};
</script>
