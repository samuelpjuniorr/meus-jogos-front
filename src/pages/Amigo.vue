<template>
<div>
  <div v-if="funcao == 'listagem'" >
    <pr-box :title="titleBox">
      <v-form class="px-2">
        <v-layout row>
          <v-flex xs12 sm12 md12 class="text-all-right">
            <v-btn fab color="secondary" @click="listarAmigos();">
              <v-icon>search</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </pr-box>
    <pr-box>
      <v-btn  color="primary"  @click="cadastrarAmigo()"  >
          {{"Cadastrar"}}</v-btn>
      <div>
        <v-data-table
          :headers="headers"
          :must-sort="true"
          :items="AmigosJson"
          :loading="searchLoading"
          :no-data-text="noDataAvailable"
          class="elevation-0 condensed"
           hide-actions
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.nome }}</td>
            <td width="20%">
                <v-tooltip top>
                    <v-btn
                        @click="alterarAmigo(props.item);"
                        icon slot="activator">
                        <v-icon color="primary">edit</v-icon>
                    </v-btn>
                    Editar
                </v-tooltip>
                <v-tooltip top>
                    <v-btn @click="excluirAmigo(props.item);" icon slot="activator">
                        <v-icon color="primary">delete</v-icon>
                    </v-btn>
                    Excluir
                </v-tooltip>
            </td>
          </template>
        </v-data-table>
      </div>
    </pr-box>
  </div>


  <div v-if="funcao == 'Cadastrar' || funcao == 'Alterar'" >
    <pr-box :title="funcao">
      <v-form class="px-2">
        <v-layout row>
         <v-text-field label="Nome" name="Nome" id="Nome"
              v-model="nomeCadastrar">
            </v-text-field>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12 class="text-all-right">
            <v-btn  color="error"  @click="cancelar()"  >
          {{"Cancelar"}}</v-btn>
          </v-flex>
          <v-flex xs12 sm12 md12 class="text-all-right">
            <v-btn  color="success"  @click="confirmarAmigo()"  >
          {{"Confirmar"}}</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </pr-box>

  </div>
</div>


</template>

<script>
import { CrudMixin } from 'vue-prodeb'; // CrudMixin do Starter Pack
import JogoService from '@/services/JogoService';
import AmigoService from '@/services/AmigoService';
import TaskDialog from '@/features/project/TaskDialog';
import store from '@/store/Store';
import i18n from '@/i18n';
import Vue from 'vue';

export default {
  name: 'amigo',
  mixins: [CrudMixin], // inicializando o CrudMixin criado pelo Starter Pack
  props: { // Propriedades originadas por outros componentes
    widget: {
      default: false,
    },
  },
  components: {// Declaração de componentes
    TaskDialog,
  },
  data() { // Declaração de variáveis
    return {

      funcao: "listagem",
      nomeCadastrar: "",
      idAlterar : null,
      headers: [ // Definição de cabeçalho GRID
        {
          text: 'Id',
          sortable: false,
          value: 'Id',
        },
        {
          text: "Nome",
          value: 'Nome',
          sortable: false,
        },
        {
            text: 'Ações',
            sortable: false,
        },

      ],
      AmigosJson: [],
      listaAmigos: [],

    };
  },
  methods: { // Declaração dos métodos
    initCrud() {
      this.serviceType = JogoService;
      this.routerName = 'amigo';
    },

    listarAmigos() {
      AmigoService.listarAmigos().then((r) => {
        this.AmigosJson = r.data;
      });
    },

    cadastrarAmigo(){
      this.funcao = 'Cadastrar'
    },
    alterarAmigo(item){
      this.funcao = 'Alterar'
      this.idAlterar = item.id;
      this.nomeCadastrar = item.nome;
    },
    excluirAmigo(item)
    {
      let obj = {
          id :  item.id,
          nome : item.nome,
        };

        AmigoService.excluirAmigo(obj).then((r) => {
          this.listarAmigos();
        });

    },
    confirmarAmigo(){
      if ( this.nomeCadastrar == "")
      {
        Vue.$toast.error('Nome obrigatório.');
      }
      else
      {
        let obj = {
          id :  this.idAlterar,
          nome : this.nomeCadastrar,
        };

        if (this.funcao == 'Cadastrar')
        {
          AmigoService.cadastrarAmigo(obj).then((r) => {
            this.nomeCadastrar = "";
            this.funcao = 'listagem';
            this.listarAmigos();

          });
        }
        else//Alterar
        {
           AmigoService.alterarAmigo(obj).then((r) => {
            this.idAlterar = null,
            this.nomeCadastrar = "";
            this.funcao = 'listagem';
            this.listarAmigos();
        });
      }


      }

    },
    cancelar()
    {
      this.idAlterar = null;
       this.funcao = "listagem";
       this.nomeCadastrar = "";
    }


  },
  mounted() {
    this.listarAmigos();

  },

  watch: { // Declaracao de propriedades assistidas

  },
};
</script>
<style>
  .v-datatable .v-input--switch.v-input--is-disabled .v-input--switch__track.info--text,
  .v-datatable .v-input--switch.v-input--is-disabled .v-input--switch__thumb.info--text {
    color: #4db6ac !important;
  }
</style>