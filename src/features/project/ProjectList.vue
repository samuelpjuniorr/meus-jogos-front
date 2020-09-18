<template>
  <div>
    <pr-box :title="titleBox">

      <div slot="buttons-header">
        <v-btn icon :to="{ name: 'project-form', params: { id: 'new' }}" v-if="!widget">
          <v-icon color="white" >add</v-icon>
        </v-btn>
      </div>

      <v-form class="px-2" @submit.prevent="search()">
        <v-layout row>
          <v-flex xs7 sm8 md10>
            <v-text-field :label="$t('attributes.name')" v-model="queryFilter.name">
            </v-text-field>
          </v-flex>
          <v-flex xs5 sm4 md2 class="text-all-right">
            <v-btn fab type="submit" color="secondary">
              <v-icon>search</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>

    </pr-box>

    <pr-box>
      <div>
        <v-layout row>
          <v-flex xs12 class="text-xs-right">
            <v-btn @click="exportToCSV()" small color="success">
              CSV
              <v-icon small dark right>file_download</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-data-table :headers="headers" :pagination.sync="orderSync" :must-sort="true"
          :items="resources" :loading="searchLoading" :hide-actions="true"
          :no-data-text="noDataAvailable"
          class="elevation-0 condensed">

          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.cost | prCurrency }}</td>
            <td>{{ props.item.created_at | prDate }}</td>
            <td>{{ props.item.tasks.length }}</td>
            <td class="text-xs-center">
              <v-btn flat icon small color="primary" @click="goToForm(props.item.id)">
                <v-icon>mode_edit</v-icon>
              </v-btn>

              <v-btn flat icon small color="primary" @click="openTaskDialog(props.item.id)">
                <v-icon>assignment</v-icon>
              </v-btn>

              <v-btn flat icon small color="error" @click="destroy(props.item.id, props.item.name)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </div>
      <pr-pagination :paginator="paginator"></pr-pagination>
    </pr-box>
  </div>

</template>

<script>
import { CrudMixin } from 'vue-prodeb'; // CrudMixin do Starter Pack
import ProjectService from '@/features/project/ProjectService';
import PrFile from '@/components/file/PrFile';
import { map as _map } from 'lodash';
import TaskDialog from './TaskDialog';

export default {
  name: 'project-list',
  mixins: [CrudMixin], // inicializando o CrudMixin criado pelo Starter Pack
  props: { // Propriedades originadas por outros componentes
    widget: {
      default: false,
    },
  },
  components: {// Declaração de componentes
    TaskDialog,
  },
  data() { // declaração de variáveis
    return {
      queryFilter: {},
      headers: [ // Definição de cabeçalho GRID
      {
        text: this.$t('views.fields.project.name'),
        sortable: true,
        value: 'name',
      },
      { text: this.$t('views.fields.project.cost'), value: 'cost' },
      { text: this.$t('attributes.created_at'), value: 'created_at' },
      { text: this.$t('views.fields.project.totalTask'), value: 'totalTask' },
      {
        text: this.$t('views.fields.actions'),
        align: 'rigth',
        value: 'actions',
      }],
    };
  },
  methods: { // Declaração dos métodos
    initCrud() {
      this.serviceType = ProjectService;
      this.routerName = 'project';
    },
    applyFilters(filters) {
      return Object.assign(filters, this.queryFilter);
    },
    openTaskDialog(projectId) {
      this.$dialog.component(TaskDialog, { projectId }).then(() => {
        this.search();
      });
    },
    exportToCSV() {
      this.reportQuery().then((resources) => {
        const data = _map(resources, (resource) => {
          if (resource.tasks) {
            resource.tasks = resource.tasks.length;
          }
          return resource;
        });
        const header = [
          { name: 'id', label: 'Id' },
          { name: 'name', label: this.headers[0].text },
          { name: 'cost', label: this.headers[1].text },
          { name: 'formatDate(created_at, \'DD-MM-YYYY\')', label: this.headers[2].text },
          { name: 'tasks', label: this.headers[3].text },
        ];
        PrFile.exportToCSV(header, data, 'projetos', {});
      });
    },
  },
  filters: {
    auditDetailTitle(auditDetail) {
      return auditDetail;
    },
  },
};
</script>
