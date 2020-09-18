// Todas as definições do tema
// Algumas especificas para a biblioteca Vuetify que é utilizada
// outras especificas para áreas internas do sistema, como o caso
// do menu

import colors from 'vuetify/es5/util/colors';

const baseColors = {
  primary: colors.blue.darken4,
  secondary: colors.orange.base,
  error: colors.red.base,
  info: colors.teal.lighten2,
  success: colors.green.base,
  warning: colors.orange.lighten3,
};

baseColors.accent = baseColors.secondary;

export default {
  baseColors,
  menu: {
    bodyClass: 'primary darken-1',
    headerClass: 'primary',
    activeItemClass: 'secondary--text',
    darkMode: true,
  },
};
