<template>
  <div>
    <pr-box :title="$t('views.titles.auditList')">
      <v-form class="flex-condensed px-2">
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <v-text-field label="Id" v-model="queryFilter.auditable_id">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm4>
            <pr-date :label="$t('views.fields.audit.dateStart')"
              v-model="queryFilter.dateStart"></pr-date>
          </v-flex>
          <v-flex xs12 sm4>
            <pr-date :label="$t('views.fields.audit.dateEnd')"
              v-model="queryFilter.dateEnd"></pr-date>
          </v-flex>
          <v-flex xs6 sm4>
            <v-text-field :label="$t('models.user')" v-model="queryFilter.user">
            </v-text-field>
          </v-flex>
          <v-flex xs6 sm8>
            <v-select
              v-bind:items="models"
              v-model="queryFilter.model"
              :label="$t('views.fields.audit.resource')"
              item-text="label"
              item-value="id"
              single-line
              bottom></v-select>
          </v-flex>
          <v-flex xs6 sm8>
            <v-radio-group v-model="queryFilter.event" :row="!$vuetify.breakpoint.smAndDown">
              <v-radio name="radio" v-for="t in types" v-bind:key="t.id"
              :label="$t(t.label)" :value="t.id" ></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs6 sm4 class="text-xs-right">
            <v-btn fab @click="search()" color="secondary">
              <v-icon>search</v-icon>

            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </pr-box>

    <pr-box>
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
          <td>
            {{ props.item.user.name}}
          </td>

          <td>
            {{props.item.event | auditType}}
          </td>

          <td>
            {{props.item.auditable_type | auditModel}}
          </td>
          <td>
            {{props.item.created_at | prDate}}
          </td>
          <td class="text-xs-center">
            <v-btn color="primary" @click="detail(props.item)" flat icon>
            <v-icon>remove_red_eye</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <pr-pagination :paginator="paginator"></pr-pagination>
    </pr-box>
  </div>
</template>

<script>
import i18n from '@/i18n';
import { CrudMixin } from 'vue-prodeb'; // CrudMixin do Starter Pack
import AuditService from '@/features/audit/AuditService';
import AuditDialogModal from './AuditDetailDialog';

export default {
  name: 'user-list',
  mixins: [CrudMixin], // inicializando o CrudMixin criado pelo Starter Pack
  props: { // Propriedades originadas por outros componentes
    widget: {
      default: false,
    },
  },
  filters: {
    auditType(typeId) {
      const type = AuditService.listTypes().filter(t => t.id === typeId);
      return type[0] ? i18n.t(type[0].label) : type[0];
    },
    auditModel(modelId) {
      const modelReplace = modelId.replace('App\\', '');
      const model = i18n.t(`models.${modelReplace.toLowerCase()}`);
      return model || modelId;
    },
  },
  data() { // declaração de variáveis
    return {
      queryFilter: {},
      types: [],
      models: [],
      headers: [ // Definição de cabeçalho GRID
        {
          text: this.$t('models.user'),
          align: 'left',
          sortable: false,
        },
        {
          text: this.$t('views.fields.action'),
          align: 'left',
          sortable: false,
        },
        {
          text: this.$t('views.fields.audit.resource'),
          align: 'left',
          sortable: false,
        },
        {
          text: this.$t('attributes.date'),
          align: 'left',
          sortable: false,
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
    initCrud() {
      this.serviceType = AuditService;
      this.routerName = 'audit';
      this.load();
    },
    detail(item) {
      this.$dialog.component(AuditDialogModal, {
        log: item,
      }).then();
    },
    load() {
      AuditService.getAuditedModels().then((response) => {
        for (let index = 0; index < response.data.models.length; index += 1) {
          const model = response.data.models[index];

          this.models.push({
            id: model,
            label: this.$t(`models.${model.toLowerCase()}`),
          });
        }
      });
      this.types = AuditService.listTypes();
    },
    applyFilters(filters) {
      return Object.assign(filters, this.queryFilter);
    },
  },
};
</script>
