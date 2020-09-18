<template>
  <v-layout row justify-center>
    <v-dialog v-model="controlDialogVisible" max-width="800px" :fullscreen="fullscreen">
      <pr-box v-if="isList" :title="titleBox">
        <div slot="buttons-header">
          <v-btn icon @click="goToForm()">
            <v-icon>add</v-icon>
          </v-btn>
        </div>

        <v-form class="flex-condensed mb-2">
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex md4 sm4>
                <pr-date :label="$t('attributes.initialDate')"
                  v-model="queryFilter.dateStart"></pr-date>
              </v-flex>
              <v-flex md4 sm4>
                <pr-date :label="$t('attributes.finalDate')"
                  v-model="queryFilter.dateEnd"></pr-date>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md4 sm4>
                <v-text-field :label="$t('attributes.task.description')"
                  v-model="queryFilter.description">
                </v-text-field>
              </v-flex>
              <v-flex md2 sm2>
                <v-text-field type="number" :label="$t('attributes.task.priority')"
                  v-model="queryFilter.priority">
                </v-text-field>
              </v-flex>
              <v-flex md4 sm4 xs12>
                <v-switch :label="$t('views.fields.task.done')"
                  v-model="queryFilter.done"></v-switch>
              </v-flex>
              <v-flex md2 sm2 xs12>
                <v-btn fab @click.native="search()" color="secondary">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>

        <v-data-table :headers="headers" :pagination.sync="orderSync" :must-sort="true"
          :items="resources" :loading="searchLoading" :hide-actions="true"
          :no-data-text="noDataAvailable"
          class="elevation-2 condensed">

          <template slot="items" slot-scope="props">
            <td>{{ props.item.description }}</td>
            <td>{{ props.item.scheduled_to | prDate }}</td>
            <td>{{ props.item.priority }}</td>
            <td>
              <v-switch @click.native="toggleDone(props.item)"
                v-model="props.item.done"></v-switch>
            </td>
            <td class="text-xs-center">
              <v-btn flat icon small color="primary" @click="goToForm(props.item.id)">
                <v-icon>mode_edit</v-icon>
              </v-btn>

              <v-btn flat icon small color="error"
                @click="destroy(props.item.id, props.item.description)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <pr-pagination :paginator="paginator"></pr-pagination>

      </pr-box>

      <v-form @submit.prevent="save" novalidate class="condensed">
        <pr-box v-if="!isList" :title="titleBox">
          <div slot="buttons-header">
            <v-btn icon @click="goToList(true)">
              <v-icon>list</v-icon>
            </v-btn>
          </div>
          <div>
            <v-container grid-list-xl fluid>
              <v-layout row wrap>
                <v-flex xs12 sm12>
                  <v-text-field :label="$t('attributes.name')" v-model="resource.description"
                    :error-messages="validationErrors.description">
                  </v-text-field>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-text-field :label="$t('attributes.task.priority')" :mask="'####'"
                    v-model="resource.priority"
                    :error-messages="validationErrors.priority">
                  </v-text-field>
                </v-flex>

                <v-flex xs12 sm6>
                  <pr-date :errorMessages="validationErrors.scheduled_to"
                    :label="$t('attributes.task.scheduled_to')"
                    v-model="resource.scheduled_to"></pr-date>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
          <div slot="buttons-footer">
            <v-btn flat type="submit" color="primary" :loading="savelLoading">Salvar</v-btn>
          </div>
        </pr-box>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
import i18n from '@/i18n';
import TaskService from '@/features/project/TaskService';
import { CrudMixin, DialogMixin } from 'vue-prodeb';

export default {
  mixins: [CrudMixin, DialogMixin],
  name: 'task-dialog',
  props: { // Propriedades originadas por outros componentes
    projectId: {
      required: true,
    },
  },
  data() { // declaração de variáveis
    return {
      queryFilter: {},
      isList: true,
      headers: [ // Definição de cabeçalho GRID
      {
        text: i18n.t('attributes.description'),
        align: 'left',
        sortable: true,
        value: 'description',
      },
      {
        text: i18n.t('attributes.task.scheduled_to'),
        align: 'left',
        sortable: false,
      },
      {
        text: i18n.t('attributes.task.priority'),
        align: 'left',
        sortable: false,
      },
      {
        text: i18n.t('views.fields.task.done'),
        align: 'left',
        sortable: false,
      },
      {
        text: i18n.t('views.fields.actions'),
        align: 'center',
        sortable: false,
      }],
    };
  },
  methods: { // Declaração dos métodos
    initCrud() {
      this.serviceType = TaskService;
      this.routerName = 'task';
      this.options.perPage = 5;
    },
    applyFilters(filter) {
      return Object.assign({ projectId: this.projectId }, this.queryFilter, filter);
    },
    goToList() {
      this.isList = true;
    },
    goToForm(id) {
      this.validationErrors = {};
      this.resource = {};
      this.resource.project_id = this.projectId;

      if (id) {
        this.service.get(id).then((data) => {
          this.isList = false;
          this.resource = data;
        });
      } else {
        this.isList = false;
      }
    },
    afterSave() {
      this.search();
    },
    toggleDone(task) {
      const data = { id: task.id, done: task.done };
      this.service.toggleDone(data).then(() => {
        this.$toast.success(i18n.t('messages.saveSuccess'));
      });
    },
  },
};
</script>
