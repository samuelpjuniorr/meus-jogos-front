import Vue from 'vue';
import axios from 'axios';

// Interceptor responsável por Exibir e esconder
// o spinner em todas requisições AJAX
axios.interceptors.request.use((config) => {
  Vue.$spinner.show();

  return config;
});

axios.interceptors.response.use(
  (response) => {
    Vue.$spinner.hide();

    return response;
  },
  (error) => {
    Vue.$spinner.hide();

    return Promise.reject(error);
  },
);
