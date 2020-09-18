import Vue from 'vue';
import inject from '@/VueInstanceInject';
import { DialogDefinitions } from 'vue-prodeb';

// Injetta na instancia base os mesmos atributos utilizados na instancia Root do Vue
// Isto é necessário para que o Dialog tenha acesso as mesmas informações (store, i18n ...)
const VueBase = Vue.extend({ ...inject });

const DialogDefinitionsConstructor = VueBase.extend(DialogDefinitions);

// Controla a instancia corrente do Dialog
let instance;
// Controla a Fila do Dialog
let queue = [];

/**
 * Inicializa a instancia de um Dialog com base no Component informado
 * @param {*} component Componente a ser utilizado no Dialog
 * @param {*} options Propriedades a ser setadas no Dialog
 */
const initInstance = (component, options) => {
  // Esta propriedade throughService é necessária pois existes tratamentos
  // especificos para quando o Dialog é aberto através do serviço
  const propsData = {
    throughService: true,
    ...options,
  };


  // Cria a instancia do component informado ou utiliza o
  // pré definido (Alert, Confirm, Prompt)
  if (component) {
    const CustomComponentConstructor = VueBase.extend(component);

    instance = new CustomComponentConstructor({ propsData });
  } else {
    instance = new DialogDefinitionsConstructor({ propsData });
  }

  // Fix para poder utilizar internacionalização nos componentes que são criados dinamicamente,
  // como por exemplo os Dialogs
  // eslint-disable-next-line
  instance['_i18n'] = inject.i18n;
};

/**
 * Exibe o próximo Dialog que está na fila
 *
 * @param {*} component
 */
const showNextDialog = (component) => {
  // Verifica se existe algum Dialog na fila para ser exibido
  if (queue.length) {
    const currentDialog = queue.shift();
    const { options } = currentDialog;

    // Inicializa uma nova instancia do Dialog com base nas definições informadas
    initInstance(component, options);

    // Escuta o evento close emitido pelo Dialog para resolver a
    // promise retornando as informações necessárias
    instance.$on('close', ({ action, data }) => {
      currentDialog.resolve({ action, data });
    });

    const el = document.createElement('div');
    instance.$mount(el);
    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
      instance.controlDialogVisible = true;
    });
  }
};

/* eslint-disable no-param-reassign */

const prepareOptions = (content, title, options) => {
  if (typeof content === 'object') {
    options = content;
    content = options.content || '';
    title = options.title || '';
  }

  return Object.assign({ title, content }, options);
};

/**
 * Funcion utilizada como classe Base para encapsula a tratativa
 * comum de todos os Dialogs, como por exemplo a Promise que irá
 * ser responsável pelo comportamento de callback
 * @param {*} options
 * @param {*} component
 */
const DialogService = (options, component) => {
  if (Vue.prototype.$isServer) return undefined;

  // eslint-disable-next-line
  return new Promise((resolve, reject) => {

    // Adiciona o Dialog na fila para controlar a ordem de visibilidade
    queue.push({
      options: Object.assign({}, options),
      resolve,
      reject,
    });

    showNextDialog(component);
  });
};

// Método que é responsável por fechar todos os Dialogs presentes e reseta a fila
DialogService.close = () => {
  if (instance) instance.closeDialog();
  queue = [];
};

DialogService.component = (component, options) => new DialogService(options, component);
DialogService.custom = options => new DialogService(options);

/**
 * Semelhante ao window.alert
 */
DialogService.alert = (content, title, options) => {
  const mergeOptions = Object.assign({
    closeWithMask: false,
    showCancelButton: false,
  }, prepareOptions(content, title, options));

  return new DialogService(mergeOptions);
};

/**
 * Semelhante ao window.confirm
 */
DialogService.confirm = (content, title, options) => {
  const mergeOptions = prepareOptions(content, title, options);

  return new DialogService(mergeOptions);
};

/**
 * Semelhante ao window.prompt
 */
DialogService.prompt = (content, title, options) => {
  const mergeOptions = Object.assign({
    showInput: true,
  }, prepareOptions(content, title, options));

  return new DialogService(mergeOptions);
};

export default DialogService;
