import axios from 'axios';
import Vue from 'vue';

export default {


 listarAmigos({ commit }, args) {
    return axios.get('amigo/listar', { params: args } );
  },
  cadastrarAmigo({ commit }, args) {
    return axios.post('amigo/cadastrar', args).then(({ data }) =>{
      Vue.$toast.success(data); });
  },
  alterarAmigo({ commit }, args) {
    return axios.post('amigo/alterar', args).then(({ data }) =>{
      Vue.$toast.success(data); });
  },
  excluirAmigo({ commit }, args) {
    return axios.post('amigo/excluir', args).then(({ data }) =>{
      Vue.$toast.success(data); });
  },



};
