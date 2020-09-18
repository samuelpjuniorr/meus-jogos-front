<template>
  <v-layout row justify-center>
    <v-dialog v-model="controlDialogVisible" :fullscreen="fullscreen"
      :max-width="width" :persistent="!closeWithMask">

      <pr-box :title="$t('views.titles.userList')">

        <div slot="buttons-header">
          <v-btn icon @click.native="closeDialog()">
            <v-icon color="white" >close</v-icon>
          </v-btn>
        </div>

        <v-data-table
          :headers="headers"
          :items="resources"
          :total-items="totalResources"
          :pagination.sync="orderSync"
          :hide-actions="true"
          :loading="searchLoading"
          :no-data-text="noDataAvailable"
          class="elevation-0">

          <template slot="items" slot-scope="props">
            <td> {{ props.item.name }} </td>
            <td> {{ props.item.email }} </td>
            <td class="text-xs-center">
              <v-btn flat icon color="primary" @click="addUser(props.item)">
                <v-icon>swap_horiz</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <pr-pagination :paginator="paginator"></pr-pagination>
      </pr-box>

    </v-dialog>
  </v-layout>
</template>

<script>
import { CrudMixin, DialogMixin } from 'vue-prodeb';
import UserService from '@/features/user/UserService';
import i18n from '@/i18n';
import { map as _map } from 'lodash';

export default {
  name: 'user-dialog',
  mixins: [CrudMixin, DialogMixin],
  props: { // Propriedades originadas por outros componentes
    usersAdd: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() { // declaração de variáveis
    return {
      users: [],
      headers: [ // Definição de cabeçalho GRID
        {
          text: i18n.t('attributes.name'),
          align: 'left',
          sortable: false,
        },
        {
          text: i18n.t('attributes.email'),
          align: 'left',
          sortable: false,
        },
        {
          text: i18n.t('views.fields.actions'),
          align: 'center',
          sortable: false,
        },
      ],
    };
  },
  methods: { // Declaração dos métodos
    initCrud() {
      this.serviceType = UserService;
      this.routerName = 'users';
      this.users = [...this.usersAdd];
    },
    applyFilters(filter) {
      const usersId = _map(this.users, 'id');
      return Object.assign(filter, { notUsers: usersId.join(',') });
    },
    addUser(user) {
      const existsUser = this.users.find(userFind => userFind.email === user.email);

      if (!existsUser) {
        this.users.push(user);
      } else {
        this.$toast.info(i18n.t('messages.user.userExists'));
      }

      this.search();
    },
    sendParamsOnClose(params) {
      this.$emit('close', Object.assign(params, { data: this.users }));
    },
  },
};
</script>
