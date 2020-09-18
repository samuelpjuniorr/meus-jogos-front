<template>
  <pr-box :title="$t('views.titles.attention')">
    <p>{{$t('messages.notAuthorized')}}</p>
  </pr-box>
</template>

<script>
export default {
  name: 'not-authorized',
  data() { // declaração de variáveis
    return {};
  },
};

</script>
