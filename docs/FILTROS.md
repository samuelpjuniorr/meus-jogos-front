# Filtros

## CurrencyFilter

> Filtro responsável por formatar valores monetários.

Parâmetros default do filtro 

``` javascript
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  suffix: '',
  precision: 2
```

- Html

``` html
<td>{{ props.item.cost | prCurrency }}</td>

<td>{{ props.item.cost | prCurrency({prefix: ''}) }}</td>

```
- Javascript (Necessário importar o filtro no controler)

``` javascript
import { currencyFilter } from 'vue-prodeb';

let formatedValue = currencyFilter(value);
let formatedValueCustomParams = currencyFilter(value, {suffix:'#'});

```

## PrDateFilter e PrDateTimeFilter

> Filtro responsável por realizar a formatação de datas (formato brasileiro DD/MM/YYYY) e datas com hora (formato brasileiro DD/MM/YYYY HH:mm)

- Html

``` html
<td>{{ props.item.created_at | prDate }}</td>

<td>{{ props.item.created_at | prDateTime }}</td>

<td>{{ props.item.created_at | prDate('MM/YYYY') }}</td>

<td>{{ props.item.created_at | prDateTime('MM/YYYY HH:mm:ss') }}</td>
```

- Javascript (Necessário importar o filtro no controler)

``` javascript
import { prDateFilter, prDateTimeFilter } from 'vue-prodeb';

let formatedDate = prDateFilter(date);
let formatedDateCustomParams = prDateFilter(date, 'MM/YY');

let formatedDateTime = prDateTimeFilter(dateTime);
let formatedDateCustomParams = prDateTimeFilter(dateTime, 'MM/YYYY HH:mm:ss');


```
