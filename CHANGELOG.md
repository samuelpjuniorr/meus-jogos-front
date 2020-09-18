1.4.2

- Ajuste do comando yarn serve
- Ajustes para utilização do await
- Atualizado para versão 1.0.3 vue-prodeb (CrudMixin utilizando await)
- Correção de tela de email para utilização do await
- Correção do teste e2e do usuário 
- Atualização do docker-compose para versão 1.2 do container vue

1.4.1

- Atualização do Vuetify para versão 1.1.7
- Atualizado o vue-cli para versão 3
- Refatoração do código para regras Eslint

1.3.0

- Refactore nos testes automatizados
- Adicionado testes e2e para o crud de usuários
- Criado script para integração/deploy continuo

1.2.1

- Corrigido versão do container docker

1.2.0

- Remoção dos componentes: 
  - PrBox
  - PrDate
  - PrInputMoney
  - PrMoneyUtilFormat
  - PrMoneyDirective
  - prDateFilter
  - prDateTimeFilter
  - currencyFilter
  - CrudMixin
  - DialogMixin
  - BaseService
  - DialogDefinitions
- Atualização da documentação
- Inclusão da Lib vue-prodeb com os componentes removidos.
- Ajuste nos imports dos componentes removidos para serem vinculados ao vue-prodeb

1.1.1

- Ajuste nos gatilhos do crudmixin
- Inclusão das bibliotecas Alasql e Pdfmake para criação de relatórios.
- Ajuste no bugs no Crudmixin.
- Atualização do Vuetify para versão 1.1.11
- Ajustes nas telas de usuário.
- Ajuste na tela de auditoria por mudança na api

1.1.0

- Alteração na estrutura das pastas. As páginas sairam de components e foram para features.
- Remoção de pasta de services. Os serviços agora estão dentro de features.
- Padronização dos arquivos de rotas.
- Alteração do logo do starter pack.
- Ajuste na cor inicial para o blue dark.
- Ajuste do readme.

1.0.0

- Migração do Starter Pack da versão do AngularJs para VueJs.
