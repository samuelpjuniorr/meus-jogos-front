<template>
  <pr-box :title="titleBox">

    <div slot="buttons-header">
      <v-btn icon :to="{ name: 'user-form', params: { id: 'new' }}"
      v-if="!widget" id="button-goto-user-form">
        <v-icon color="white">add</v-icon>
      </v-btn>
    </div>

    <div>
      <v-layout row>
        <v-flex xs12 class="text-xs-right">
          <v-btn @click="exportToPdf()" small color="primary">
            PDF
            <v-icon small dark right>file_download</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="resources"
        :total-items="totalResources"
        :pagination.sync="orderSync"
        :no-data-text="noDataAvailable"
        :hide-actions="true"
        :loading="searchLoading"
        class="elevation-0">

        <template slot="items" slot-scope="props">

          <td>
            <v-avatar size="36px" slot="activator">
              <img :src="getImage(props.item.image)" alt="">
            </v-avatar> &nbsp;

            {{ props.item.name }} ({{ props.item.email }})
          </td>
          <td class="text-xs-center">

            <v-btn color="primary" flat icon @click="goToForm(props.item.id)">
              <v-icon>mode_edit</v-icon>
            </v-btn>

            <v-btn flat icon color="error" class="button-delete-user"
            @click="destroy(props.item.id, props.item.name)">
              <v-icon>delete</v-icon>
            </v-btn>

          </td>
        </template>
      </v-data-table>
      <pr-pagination :paginator="paginator"></pr-pagination>
    </div>
  </pr-box>
</template>

<script>
import { CrudMixin } from 'vue-prodeb'; // CrudMixin do Starter Pack
import UserService from '@/features/user/UserService';
import pdfmake from '@/components/file/PdfmakeUtil';
import { map as _map } from 'lodash';
import img from '@/assets/no_avatar.gif';

export default {
  name: 'user-list',
  mixins: [CrudMixin], // inicializando o CrudMixin criado pelo Starter Pack
  props: { // Propriedades originadas por outros componentes
    widget: {
      default: false,
    },
  },
  data() { // declaração de variáveis
    return {
      headers: [ // Definição de cabeçalho GRID
        {
          text: this.$t('attributes.name'),
          align: 'left',
          sortable: true,
          value: 'name',
        },
        {
          text: this.$t('views.fields.actions'),
          sortable: false,
          align: 'rigth',
        },
      ],
    };
  },
  methods: { // Declaração dos métodos
    getImage(image) {
      if (image) {
        return image;
      }

      return img;
    },
    initCrud() {
      this.serviceType = UserService;
      this.routerName = 'user';
    },
    exportToPdf() {
      this.reportQuery().then((resources) => {
        const data = _map(resources, resource => [resource.name, resource.email]);

        data.splice(0, 0, ['Nome', 'Email']);

        const dd = {
          content: [
            {
              text: 'Usuários',
              style: 'header',
            },
            'Lista de usuários',
            {
              style: 'tableExample',
              table: {
                body: data,
              },
            },
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10],
            },
            tableExample: {
              margin: [0, 5, 0, 15],
            },
          },
        };
        pdfmake.createPdf(dd).download('lista_usuarios.pdf');
      });
    },
  },
};
</script>
