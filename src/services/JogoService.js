import { BaseService } from 'vue-prodeb';
import store from '@/store';

export default class JogoService extends BaseService {
  constructor() {
    super('jogo');
  }


  static listarJogos(params) {
      return store.dispatch('listarJogos', params);
  }
  static cadastrarJogo(params) {
    return store.dispatch('cadastrarJogo', params);
  }
  static alterarJogo(params) {
    return store.dispatch('alterarJogo', params);
  }
  static excluirJogo(params) {
    return store.dispatch('excluirJogo', params);
  }



}
