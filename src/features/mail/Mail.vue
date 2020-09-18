<template>
  <v-form @submit.prevent="save()" novalidate>
    <pr-box :title="$t('views.titles.mailSend')">
      <v-layout row wrap>
        <v-flex xs9 sm10 md11>
          <v-autocomplete
            :label="$t('views.fields.mail.to')"
            :loading="loading"
            multiple
            cache-items
            chips
            item-text="name"
            item-value="id"
            :items="users"
            return-object
            :error-messages="validationErrors.users"
            :search-input.sync="search"
            v-model="mail.users">

            <template slot="selection" slot-scope="data">
                <v-chip
                  @input="data.parent.selectItem(data.item)"
                  class="chip--select-multi"
                  :selected="data.selected"
                  close
                  :disabled="data.disabled"
                  :key="data.item.id">
                  <v-avatar class="secondary white--text">
                    {{ data.item.name.slice(0, 1).toUpperCase() }}
                  </v-avatar>
                  {{ data.item.email }}
                </v-chip>
              </template>

            </v-autocomplete>
        </v-flex>
        <v-flex xs3 sm2 md1 class="text-all-right">
          <v-btn @click.native="openModalUsers()" fab color="secondary">
            <v-icon dark>search</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 md12>
          <v-text-field :label="$t('views.fields.mail.subject')" v-model="mail.subject"
            :error-messages="validationErrors.subject">
          </v-text-field>
        </v-flex>
        <v-flex xs12 md12>
          <v-textarea :label="$t('views.fields.mail.message')" v-model="mail.message"
            :error-messages="validationErrors.message">
          </v-textarea>
        </v-flex>
      </v-layout>

      <div slot="buttons-footer">
        <v-btn flat type="submit" color="primary" :loading="sendLoading">
          {{$t('views.actions.send')}}
        </v-btn>
      </div>

    </pr-box>
  </v-form>
</template>

<script>
import UserService from '@/features/user/UserService';
import MailService from '@/features/mail/MailService';
import UserDialog from '@/features/user/UserDialog';
import i18n from '@/i18n';

export default {
  data() { // declaração de variáveis
    return {
      userService: null,
      mailService: null,
      users: [],
      mail: { users: [] },
      loading: false,
      search: null,
      validationErrors: [],
      sendLoading: false,
    };
  },
  created() { /*Metodo de start do componente*/
    this.userService = new UserService();
    this.mailService = new MailService();
    this.querySelections();
  },
  watch: { // Declaracao de propriedades assistidas
    search(val) {
      if (val) {
        this.querySelections(val);
      }
    },
  },
  methods: { // Declaração dos métodos
    async querySelections(val) {
      this.loading = true;
      const query = { limit: 5 };
      if (val) {
        query.email = val;
      }
      const data = await this.userService.query(query);

      this.users = [...data.filter((user) => {
        const userFind = this.users.find(userSelected => user.email === userSelected.email);
        return !userFind;
      }), ...this.users];

      this.loading = false;
    },
    async save() {
      this.sendLoading = true;
      try {
        await this.mailService.save(this.mail);
        this.$toast.success(i18n.t('messages.mail.sendMailSuccess'));
        this.validationErrors = {};
        this.mail = { users: [] };
      } catch (error) {
        if (error.response && typeof error.response.data === 'object') {
          this.validationErrors = error.response.data;
        } else {
          this.validationErrors = {};
        }
      }
      this.sendLoading = false;
    },
    openModalUsers() {
      this.$dialog.component(UserDialog, {
        width: 800,
        usersAdd: this.mail.users,
      }).then((response) => {
        this.mail.users = [...response.data, ...this.mail.users];
        this.users = [...response.data.filter((user) => {
          const userFind = this.users.find(userSelected => user.email === userSelected.email);
          return !userFind;
        }), ...this.users];
      });
    },
  },
};
</script>

<style>

</style>
