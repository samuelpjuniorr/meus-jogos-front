<template>
<v-form @submit.prevent="save">

  <pr-box :title="$t('views.titles.update')">
    <v-layout row wrap>
      <v-flex xs12 sm7 md9>
        <v-text-field :label="$t('attributes.name')"
          v-model="resource.name"
          :counter="100"
          :error-messages="valdationErrors.name">
        </v-text-field>

        <v-text-field :label="$t('attributes.email')"
          v-model="resource.email"
          :counter="100"
          :error-messages="valdationErrors.email">
        </v-text-field>

        <v-text-field :label="$t('attributes.password')"
          type="password"
          v-model="resource.password"
          :error-messages="valdationErrors.password">
        </v-text-field>

        <v-text-field :label="$t('views.fields.login.confirmPassword')"
          type="password"
          v-model="resource.password_confirmation"
          :error-messages="valdationErrors.password_confirmation">
        </v-text-field>
      </v-flex>
      <v-flex d-flex xs12 sm5 md3 class="text-all-center">
        <pr-upload-file
            :avatar="true"
            :defaultPreview="$store.state.currentUser.image ? $store.state.currentUser.image
            : require('@/assets/no_avatar.gif')"
            accept="image/png,image/jpeg"
            :max-size="imageSize"
            @size-exceeded="onSizeExceeded"
            @load="onLoad" />
      </v-flex>
    </v-layout>

    <div slot="buttons-footer">
      <v-btn type="submit" color="primary" :loading="savelLoading">
        {{$t('views.actions.update')}}</v-btn>
    </div>
  </pr-box>

</v-form>
</template>

<script>

export default {
  name: 'profile',
  data() { // declaração de variáveis
    return {
      imageSize: 3,
      valdationErrors: [],
      savelLoading: false,
      resource: Object.assign({}, this.$store.state.currentUser),
    };
  },
  methods: { // Declaração dos métodos
    save() {
      this.$store.dispatch('updateProfile', this.resource).then(() => {
        this.$toast.success(this.$t('messages.saveSuccess'));
      }).catch((error) => { // Tratamento de erro
        this.valdationErrors = error.response.data;
      });
    },
    onLoad(dataUri) {
      this.resource.image = dataUri;
    },
    onSizeExceeded(size) {
      this.$toast.success(`Imagem com ${size} mb, o tamanho permitido é ${this.imageSize}`);
    },
  },
};
</script>

<style>


</style>
