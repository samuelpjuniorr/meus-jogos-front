import axios from 'axios';
import Vue from 'vue';

export default {


 listarJogos({ commit }, args) {
    return axios.get('jogo/listar', { params: args } );
  },
  cadastrarJogo({ commit }, args) {
    return axios.post('jogo/cadastrar', args).then(({ data }) =>{
      Vue.$toast.success(data); });
  },
  alterarJogo({ commit }, args) {
    return axios.post('jogo/alterar', args).then(({ data }) =>{
      Vue.$toast.success(data); });
  },
  excluirJogo({ commit }, args) {
    return axios.post('jogo/excluir', args).then(({ data }) =>{
      Vue.$toast.success(data); });
  },



};
