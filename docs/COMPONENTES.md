
# Componentes

## Dialog

> Existem no core do starterpack 3 tipos de dialog e a possibilidade de criar um customizado.

 - Alert

```javascript
this.$dialog.alert({ title: 'Titulo do Alert', content: 'Descritivo do alert' })
  .then((response) => {
    this.$log.debug('Action', response.action);
    this.$log.debug('Data', response.data);
  });
```

 - Confirm

```javascript
this.$dialog.confirm({ title: 'Titulo do Confirm ', content: 'Descritivo do confirm' })
  .then((response) => {
    this.$log.debug('Action', response.action);
    this.$log.debug('Data', response.data);
  });
```

 - Prompt

```javascript
this.$dialog.prompt({ title: 'Titulo do Prompt ', content: 'Descritivo do prompt' })
  .then((response) => {
    this.$log.debug('Action', response.action);
    this.$log.debug('Data', response.data);
  });

```

- Dialog customizado (Criar um arquivo .vue). O exemplo abaixo é o component UserDialog.vue
- Para enviar parametros para quem abriu o Dialog é necessário implementar o método sendParamsOnClose e passar o objeto dentro de params como no exemplo abaixo.

```html

<template>
  <v-layout row justify-center>
    <v-dialog v-model="controlDialogVisible" :fullscreen="fullscreen"
      :max-width="width" :persistent="!closeWithMask">
    </v-dialog>
  </v-layout>
</template>

<script>
  import { DialogMixin } from 'vue-prodeb';

  export default {
    name: 'user-dialog',
    mixins: [DialogMixin],
    props: { // Propriedades originadas por outros componentes
      usersAdd: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() { // declaração de variáveis
      return {
      };
    },
    methods: { // Declaração dos métodos
      // params é um objeto que contém data e action
      sendParamsOnClose(params) {
        this.$emit('close', Object.assign(params, { data: this.resource }) );
      },
    },
  };
</script>

```

> Existem 2 maneiras para executar o Dialog customizado.

> ** É necessário importar o componente para poder utilizar.

``` javascript
  import UserDialog from '@/features/user/UserDialog';
  ...

  this.$dialog.component(UserDialog, { closeWithEsc: false, widget: false })
  .then((response) => {
    this.$log.debug('Action', response.action);
    this.$log.debug('Data', response.data);
  });
```

> ** Para caputrar os dados e os eventos realizados pelo dialog é necessário verificar no response
os atributos action e data.

## PrBox

> Esse componente é reponsavel por montar a estrutura das páginas onde o conteúdo será disponibilizado.

- Simples

```html
<pr-box :title="titleBox">
</pr-box>
```

- Com slots para botões: buttons-header e buttons-footer

```html
<pr-box :title="titleBox">

  <div slot="buttons-header">
    <v-btn icon :to="{ name: 'project-form', params: { id: 'new' }}">
      <v-icon color="white" >add</v-icon>
    </v-btn>
  </div>

  <span>Conteúdo</span>

  <div slot="buttons-footer">
    <v-btn type="submit" color="primary" :loading="savelLoading">{{$t('views.actions.save')}}</v-btn>
  </div>

</pr-box>
```

.

## PrDate

> Esse componente é responsável por controlar a exibição do modal para selecionar a data.
> A data por padrão é vem formatada. Caso precise de customização verificar as props do componente.

> Os parâmetros que esse componente aceita:

- closeSelect: Fecha o modal quando a data é selecionada, padrão false.
- displayFormat: Formato exibido no v-model
- displayMask: Formato no datepicker
- evento @blur: Evento disparado ao sair do campo

```html
<pr-date :label="$t('attributes.initialDate')"
  v-model="queryFilter.dateStart"></pr-date>
```


## PrInputMask
> Componente responsável por disponibilizar através do [cleave.js](https://nosir.github.io/cleave.js/)
mais opções de máscara que o Vuetify disponibiliza.

> Para utilizar os formatos que o cleave.js disponibiliza só é necessário informar o parâmetro
options com a [configuração](https://github.com/nosir/cleave.js/blob/master/doc/options.md).

> Os parâmetros que esse componente aceita:

- label: Label do input
- type: Tipo do campo, padrão String
- raw: v-model formatado, padrão true
- options: máscara para ser aplicada no input. Verificar opções no cleave.js
- evento @blur: Evento disparado ao sair do campo

```html
<pr-input-mask
    :label="$t('views.fields.project.number')"
    :error-messages="validationErrors.cost"
    :options="{ numeral: true, numeralIntegerScale: 4 }"
    v-model="number">
</pr-input-mask>
```

## PrInputMoney
> Componente responsável por disponibilizar formatação monetária.

> Os parâmetros que esse componente aceita:

  - decimal: ',',
  - thousands: '.',
  - prefix: 'R$ ',
  - suffix: '',
  - precision: 2,
  - masked: false (reflete no model o campo com a máscara)
  - evento @blur: Evento disparado ao sair do campo

>** Esse parâmetros são os defaults.

```html
<pr-input-money
    :label="$t('views.fields.project.cost')"
    :error-messages="validationErrors.cost"
    v-model="resource.cost">
</pr-input-money>
```
