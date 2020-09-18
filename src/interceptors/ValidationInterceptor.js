import Vue from 'vue';
import axios from 'axios';
import store from '@/store';
import router from '@/router';

// Interceptor responsável por tratar as requisições que tenham
// erro devido algum validação de negócio

axios.interceptors.response.use(
  response => response,
  (error) => {
    if(error.response.status === 400 &&
      typeof error.response.data === 'string') {
      Vue.$toast.error(error.response.data);
    } else if (error.response.status === 400 &&
      error.response.data instanceof Blob) {
        error.response.data.text().then((res) => {
          Vue.$toast.error(res);
        });
    } else if(error.response.status === 401) {
      Vue.$toast.error('Sessão expirada');
      store.dispatch('logout');
      router.replace('/');
    } else {
      Vue.$toast.error('Serviço indisponível');
    }

    return Promise.reject(error);
  },
);
