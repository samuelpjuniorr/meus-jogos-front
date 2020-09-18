import Vue from 'vue';
import VueI18n from 'vue-i18n';
import views from '@/i18n/pt-BR/Views';
import models from '@/i18n/pt-BR/Models';
import messages from '@/i18n/pt-BR/Messages';
import global from '@/i18n/pt-BR/Global';
import attributes from '@/i18n/pt-BR/Attributes';
import dialog from '@/i18n/pt-BR/Dialog';

// Encapsula todas as mensagens de internacionalização
const translate = {
  'pt-BR': {
    views,
    messages,
    models,
    global,
    attributes,
    dialog,
  },
};

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'pt-BR', // set locale
  messages: translate, // set locale messages
});

export default i18n;
