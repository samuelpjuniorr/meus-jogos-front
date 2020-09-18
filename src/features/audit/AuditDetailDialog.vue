<template>

  <v-layout row justify-center>
    <v-dialog v-model="controlDialogVisible" max-width="800px">

      <v-container grid-list-xl fluid>
        <v-layout row wrap>

          <v-flex :class="classOld">
            <pr-box v-if="log && log.old_values.length != 0"
            :title="log | auditDetailTitle('before')">
            <div slot="buttons-header">
              <v-btn icon @click.native="closeDialog()">
                <v-icon color="white" >close</v-icon>
              </v-btn>
            </div>
              <div v-for="(value, key) in log.old_values" :key="key">
                <div v-if="verifyImage(value)" class="text-xs-center">
                  <img class="pictureAudit" :src="value" />
                </div>
                <div v-else>
                  <span> <b>{{ log | attrLog(key) | tAttr}} </b></span> {{ value | auditValue(key)}}
                  <hr/>
                </div>
              </div>
            </pr-box>
          </v-flex>

          <v-flex :class="classNew">
            <pr-box v-if="log && log.new_values.length != 0"
              :title="log | auditDetailTitle('after')">
              <div slot="buttons-header">
                <v-btn icon @click.native="closeDialog()">
                  <v-icon color="white" >close</v-icon>
                </v-btn>
              </div>
                <div v-for="(value, key) in log.new_values" :key="key">
                  <div v-if="verifyImage(value)" class="text-xs-center">
                    <img class="pictureAudit" :src="value" />
                  </div>
                  <div v-else>
                    <span> <b>{{ log | attrLog(key) | tAttr}} </b></span>
                    {{ value | auditValue(key)}}
                    <hr/>
                  </div>
                </div>
            </pr-box>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>

</template>

<script>
import i18n from '@/i18n';
import { endsWith as _endsWith } from 'lodash';
import { prDateFilter, currencyFilter, DialogMixin } from 'vue-prodeb';

export default {
  mixins: [DialogMixin],
  props: { // Propriedades originadas por outros componentes
    log: {},
  },
  data() { // declaração de variáveis
    return {};
  },
  computed: { //Campos computados
    classOld() {
      return {
        'sm6 offset-sm4 xs12':
          this.log &&
          this.log.old_values.length !== 0 &&
          this.log.new_values.length === 0,
        'sm6 xs12':
          this.log &&
          this.log.old_values.length !== 0 &&
          this.log.new_values.length !== 0,
        'xs12 ': !this.log || this.log.old_values.length === 0,
      };
    },
    classNew() {
      return {
        'sm6 offset-sm4 xs12':
          this.log &&
          this.log.new_values.length !== 0 &&
          this.log.old_values.length === 0,
        'sm6 xs12':
          this.log &&
          this.log.new_values.length !== 0 &&
          this.log.old_values.length !== 0,
        'xs12 ': !this.log || this.log.new_values.length === 0,
      };
    },
  },
  methods: { // Declaração dos métodos
    verifyImage(value) {
      return typeof value === 'string' && value.startsWith('data:imag');
    },
  },
  filters: {
    auditDetailTitle(auditDetail, status) {
      if (auditDetail && auditDetail.event === 'updated') {
        if (status === 'before') {
          return i18n.t('dialog.audit.updatedBefore');
        }
        return i18n.t('dialog.audit.updatedAfter');
      } else if (auditDetail && auditDetail.event) {
        return i18n.t(`dialog.audit.${auditDetail.event}`);
      }

      return null;
    },
    attrLog(log, key) {
      const modelReplace = log.auditable_type.replace('App\\', '');
      return `${modelReplace.toLowerCase()}.${key}`;
    },
    auditValue(value, key) {
      if (
        value instanceof Date ||
        _endsWith(key, '_at') ||
        _endsWith(key, '_to')
      ) {
        return prDateFilter(value);
      }

      if (typeof value === 'boolean') {
        return i18n.t(value ? 'global.yes' : 'global.no');
      }

      // eslint-disable-next-line
      if (Number(value) === value && value % 1 !== 0) {
        return currencyFilter(value);
      }

      return value;
    },
  },
};
</script>

<style>
.v-dialog {
  box-shadow: none !important;
}

.pictureAudit {
  width: 200px;
  height: 200px;
}
</style>
