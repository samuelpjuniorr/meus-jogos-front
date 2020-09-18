import i18n from '@/i18n';

// Filtro para traduzir um atributo de um model
export default (name) => {
  const key = `attributes.${name}`;
  const translate = i18n.t(key);

  return (translate === key) ? name : translate;
};
