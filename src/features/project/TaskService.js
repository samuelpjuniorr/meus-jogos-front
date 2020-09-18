import { BaseService } from 'vue-prodeb';

export default class TaskService extends BaseService {
  constructor() {
    super('tasks');
  }

  /**
   * Serviço especifico para alternar o estado de uma tarefa
   * @param {*} task objeto com o id da tarefa a ser modificada
   */
  toggleDone(task) {
    return this.request('PUT', 'toggleDone', task);
  }
}
