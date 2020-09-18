<template>
  <v-form @submit.prevent="save()" novalidate>
    <pr-box :title="titleBox">
      <div slot="buttons-header">
        <v-btn icon @click.native="goToList">
          <v-icon color="white">list</v-icon>
        </v-btn>
      </div>
      <v-text-field :label="$t('attributes.name')" v-model="resource.name" :counter="100"
        :error-messages="validationErrors.name">
      </v-text-field>

      <pr-input-money
        :label="$t('views.fields.project.cost')"
        :error-messages="validationErrors.cost"
        v-model="resource.cost"></pr-input-money>

      <div slot="buttons-footer">
        <v-btn flat type="submit" color="primary" :loading="savelLoading">
          {{$t('views.actions.save')}}
        </v-btn>
      </div>
    </pr-box>
  </v-form>
</template>

<script>
import { CrudMixin } from 'vue-prodeb'; // CrudMixin do Starter Pack
import ProjectService from '@/features/project/ProjectService';

export default {
  name: 'project-form',
  mixins: [CrudMixin], // inicializando o CrudMixin criado pelo Starter Pack
  data() { // declaração de variáveis
    return {
    };
  },
  methods: { // Declaração dos métodos
    initCrud() {
      this.serviceType = ProjectService;
      this.routerName = 'project';
      this.componentType = 'FORM';
    },
  },
};
</script>
