import { BaseService } from 'vue-prodeb';
import store from '@/store';

export default class AmigoService extends BaseService {
  constructor() {
    super('amigo');
  }


  static listarAmigos(params) {
      return store.dispatch('listarAmigos', params);
  }
  static cadastrarAmigo(params) {
    return store.dispatch('cadastrarAmigo', params);
  }
  static alterarAmigo(params) {
    return store.dispatch('alterarAmigo', params);
  }
  static excluirAmigo(params) {
    return store.dispatch('excluirAmigo', params);
  }



}
