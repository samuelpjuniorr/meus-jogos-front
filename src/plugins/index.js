import Vue from 'vue';
import VueProdeb from 'vue-prodeb';
import PrDialogPlugin from '@/plugins/dialog';
import PrSpinnerPlugin from '@/plugins/SpinnerPlugin';
import Vuetify from 'vuetify';
import theme from '@/Theme';

// Centraliza as definições de todos os plugins
Vue.prototype.$theme = theme;
Vue.$theme = theme;

Vue.use(Vuetify, {
  theme: theme.baseColors,
});
Vue.use(PrSpinnerPlugin);

Vue.use(PrDialogPlugin);

Vue.use(VueProdeb);
