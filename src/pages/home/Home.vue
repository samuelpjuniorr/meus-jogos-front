<template>

</template>

<script>

import axios from 'axios';

export default {
  name: 'home',
  data() { // declaração de variáveis
    return {


    };
  },
  components: {// Declaração de componentes
  },
  mounted() {
    console.log('usuario')
    console.log(this.$store.state.currentUser)
  },
  methods: { // Declaração dos métodos

  },
};

</script>
