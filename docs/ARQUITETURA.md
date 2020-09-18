# Arquitetura

## BaseService

> O BaseService é responsável por oferecer uma abstração para a comunicação com a api. Nessa abstração os métodos que o crud necessita já estão preparados (POST, PUT, DELETE, GET). A utilização do BaseService é bem simples.

  * No construtor é necessário passar o nome do resource que é utilizado na api do backend.
  * Para implementar outros métodos que chamam sua api o base service disponibiliza um método chamado this.request.

  * Você pode encontrar exemplos da utilização do base service em [ProjectService](../src/features/project/ProjectService.js) e [TaskService](../src/features/project/TaskService.js)

### Os métodos que o base service já implementa:

- get
- save
- destroy
- query
- paginateQuery
- request

## CrudMixin

> O CrudMixin é responsável por oferecer uma abstração para realizar as operações de crud para um controlador. Com a utilização dele você já ativa automáticamente no controlador as opções de listagem, inclusão/edição e exclusão. A utilização dele é bem simples.

> O CrudMixin possui gatilhos que são disponibilizados para facilitar o desenvolvimento.

- beforeSearch
- applyFilters
- afterSearch
- beforeSave
- afterLoadResource
- afterSave
- beforeRemove
- afterRemove
- onSaveError

> Como utilizar o CrudMixin:

```javascript
import { CrudMixin } from 'vue-prodeb'; // CrudMixin do Starter Pack

export default {
  mixins: [CrudMixin], // inicializando o CrudMixin criado pelo Starter Pack
  initCrud() {
    this.serviceType = ProjectService;
    this.routerName = 'project';
    this.componentType = 'FORM';
  }
}
```

* Exemplos de utilização [ProjectList](../src/features/project/ProjectList.vue) e [ProjectForm](../src/features/project/ProjectForm.vue)


## Relatórios

- CSV e XLSX
> Podemos utilizar a biblioteca [Alasql](https://github.com/agershun/alasql) para gerar relatórios xlsx e csv de uma maneira simples. Existe uma abstração que disponibiliza métodos para a geração dos relatórios. Para utilizar essa abstração é necessário realizar o import [PrFile](../src/components/file/PrFile.js). Na página [Home](../src/features/home/Home.vue) existe um exemplo da utilização.

- PDF
> Podemos utilizar a biblioteca [Pdfmake](https://github.com/bpampuch/pdfmake) para gerar relatórios em PDF. A utilização é bem simples. Você deve importar o componente [PdfmakeUtil](../src/components/file/PdfmakeUtil.js) e utilizar os métodos disponibilizados na biblioteca. Na página de [Usuários](../src/features/user/UserList.vue) existe um exemplo da utilização.
