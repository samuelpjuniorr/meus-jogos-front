import lodash from 'lodash';
import alasql from './AlasqlUtil';

export default class PrFile {
  /**
   * Exporta os dados enviados para o formato informado.
   *
   * @param {string|array} fields
   *  String contendo os campos separado por virgula
   *    ex: name, description
   *    ex: name as Nome, description as 'Descrição'
   *    ex: *  (para todos os campos)
   *  Array de objetos com os campos
   *    ex: [
   *      { name: 'name', label: 'Nome' },
   *      { name: 'description', label: 'Descrição' },
   *      { name: 'role.name', label: 'Perfil' },
   *      { name: 'formatDate(date)', label: 'Data' },*
   *    ]
   * @param {array} data - Array que vai servir como fonte de dados
   * @param {string} fileName - Nome do arquivo sem a extensão
   * @param {object} config
   * Configurações da documentação do alasql como:
   *  - (boolean) headers
   * mais as destacadas abaixo
   *  - (string) where
   *  - (string) orderBy
   *
   * filters definidos
   *
   * formatDate(campo, [formato])
   *
   * Exemplo:
   *
   * var cars = [
   *  { name: 'Stilo',  brand: 'Fiat', date: moment().subtract(1, 'years') },
   *  { name: 'Punto',  brand: 'Fiat', date: moment().subtract(3, 'years') },
   *  { name: 'Fiesta', brand: 'Ford', date: '04-01-2017' }
   * ]
   *
   * PrFile.exportToExcel([
   *  { name: 'brand', label: 'Marca' },
   *  { name: 'name', label: 'Nome' },
   *  { name: 'formatDate(date, \'DD-MM-YYYY\')', label: 'Comprado em?' }
   * ], cars, 'data-export', {
   *  orderBy: 'brand ASC, name ASC',
   *  where: 'brand like "%Fi%"'
   * });
   *
   * @returns {promisse} - Retorna uma promisse que pode ou não ser resolvida
   */

  static exportTo(fields, data, fileNameParam, config) {
    let defaultConfig = {
      headers: true,
    };

    let fileName = fileNameParam;

    if (config) defaultConfig = { ...defaultConfig, ...config };
    if (!fileNameParam) fileName = 'export';

    defaultConfig.where = (defaultConfig.where) ? ` WHERE ${defaultConfig.where}` : ' ';

    defaultConfig.orderBy = (defaultConfig.orderBy) ? ` ORDER BY ${defaultConfig.orderBy}` : ' ';

    fileName = `${fileName}.${defaultConfig.formatTo}`;
    return alasql.promise(`SELECT  ${this.buildFields(fields)}
      INTO  ${defaultConfig.formatTo.toUpperCase()} (?, ?) FROM ?
      ${defaultConfig.where} ${defaultConfig.orderBy}`, [fileName, defaultConfig, data]);
  }

  static buildFields(fieldsParam) {
    let fields = null;
    if (Array.isArray(fieldsParam)) {
      fields = lodash.map(fieldsParam, field => `${field.name} as [${field.label}]`).join(', ');
    } else {
      fields = '*';
    }
    return fields;
  }

  static exportToCSV(fields, data, fileName, config = {}) {
    config.formatTo = 'csv';
    return this.exportTo(fields, data, fileName, config);
  }

  static exportToExcel(fields, data, fileName, config = {}) {
    config.formatTo = 'xlsx';
    return this.exportTo(fields, data, fileName, config);
  }
}
