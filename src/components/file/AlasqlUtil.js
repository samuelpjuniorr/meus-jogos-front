import alasql from 'alasql';
// eslint-disable-next-line
import XLSX from 'xlsx';
import { prDateFilter } from 'vue-prodeb';

alasql.fn.formatDate = (date, formatDate) => prDateFilter(date, formatDate);

alasql.utils.isBrowserify = false;
alasql.utils.global.XLSX = XLSX;

export default alasql;
