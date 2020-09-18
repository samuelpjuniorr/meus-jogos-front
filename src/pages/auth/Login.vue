<template>
<v-layout row>
  <v-flex xs12 sm6 offset-sm3 class="mt-5">
    <pr-box title="Login">
      <v-card-text>
        <v-flex sm6 offset-sm3>
          <v-form @submit.prevent="login" novalidate id="form-login">
            <v-text-field label="nome" name="nome" id="nome"
              v-model="credentials.nome"
              :error-messages="valdationErrors.nome">
            </v-text-field>
            <v-text-field label="Senha" name="senha" id="senha"
              type="password"
              v-model="credentials.senha"
              :error-messages="valdationErrors.senha">
            </v-text-field>

            <v-btn block color="primary" id="button-login" type="submit" name="loginButton">
              {{"Login"}}</v-btn>
          </v-form>
        </v-flex>
      </v-card-text>

    </pr-box>
  </v-flex>
</v-layout>
</template>

<script>
import AuthService from '@/services/AuthService';
import UtilService from '@/services/UtilService'; // Arquivo com métodos gerais
import axios from 'axios';

export default {
  name: 'login',
  components: {// Declaração de componentes

  },
  data() { // declaração de variáveis
    return {
      roles: [],
      valdationErrors: [],
      showModal: false,
      credentials: { //Credenciais do usuario
        nome: '',
        senha: '',
      },
    };
  },
  mounted() {

  },
  methods: { // Declaração dos métodos
    login() {
      return AuthService.login(this.convertObject(this.credentials))
        .then(() => {
          this.$router.replace({
            name: 'home',
          });

        })
        .catch((error) => { // Tratamento de erro
          this.valdationErrors = error.response.data;
        });
    },
    convertObject(payload) {
      return {
        nome: payload.nome,
        senha: payload.senha,
      };
    },
  },
};
</script>
<style>
    .build-info {
        color: lightgrey;
    }
</style>

