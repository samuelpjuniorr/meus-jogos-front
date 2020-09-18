import moment from 'moment';
import store from '@/store/Store';
export default class UtilService {

    static roundTimeDifference(beginning, end) {
        const dateBegin = new Date(beginning);
        if(end){
            const dateEnd = new Date(end);

            // Difference in seconds
            let timeInMinutes = (dateEnd - dateBegin) / 1000;

            // Converts to minutes
            timeInMinutes /= 60;

            const hours = Math.floor(timeInMinutes / 60);
            const minutes = Math.floor(timeInMinutes % 60);

            // Fix maximum number of decimal cases
            return `${hours}h${minutes}m`;
        }
        return '';
    }

    static roundTimeDifferenceMinutes(beginning, end) {
        if(end && beginning){
            const dateBegin = new Date(beginning);
            const dateEnd = new Date(end);

            // Difference in seconds
            let timeInMinutes = ((dateEnd - dateBegin) / 1000);
            // Converts to minutes
            timeInMinutes /= 60;

            return timeInMinutes;
        }
        return 0;
    }
    // Função que converte em minutos
    static convertTime(timeInMinutes) {
        let hours = Math.trunc(timeInMinutes / 60);
        //Pra não trazer o sinal de negativo também nos minutos
        let minutes = Math.floor(timeInMinutes % 60) < 0 ? Math.floor(timeInMinutes % 60) * -1 : Math.floor(timeInMinutes % 60)
        if (minutes == 60)//Por questão de aproximação pode acontecer de dar 60 minutos
            minutes = 59

        // Fix maximum number of decimal cases
        return `${hours}h${minutes}m`;
    }
    // Função que retorna o horário no formato do Brasil
    static convertToPTBrStr(date) {
        if ( !date )
            return '--:--';

        const [hours, minutes] = new Date(date).toLocaleTimeString("pt-BR").split(":");
        return `${hours}:${minutes}`;
    }
    /*Formata a data para o nosso padrão - Dia, Mês e ano*/
    static formattedDate(date) {
        const monthDate = moment(date).locale('pt-BR').format('DD/MM/YYYY').toString();
        return `${monthDate.charAt(0).toUpperCase()}${monthDate.slice(1)}`;
    }
    /*Formata a data para o nosso padrão - Dia, Mês e ano*/
    static formattedMoth(date) {
        const monthDate = moment(date).locale('pt-BR').format('MM/YYYY').toString();
        return `${monthDate.charAt(0).toUpperCase()}${monthDate.slice(1)}`;
    }
    /*Formata a data para o nosso padrão - Dia, Mês e ano*/
    static formatarDataHora(date) {
        let d = date.split(' ');
        let monthDate = moment(d[0]).format('DD/MM/YYYY').toString();
        return monthDate+" "+d[1];
    }
    // Função que retorna o tipo de movimento po extenso
    static retornarTipoMovimento(tipoMovimento) {
        var retorno;
        switch(tipoMovimento) {
            case 1:
                retorno = "Entrada 1"; // Entrada 1
                break;
            case 2:
                retorno = "Saída 1"; // Saída 1
                break;
            case 3:
                retorno = "Entrada 2"; // Entrada 2
                break;
            case 4:
                retorno = "Saída 2"; // Saída  2
                break;
            case 5:
                retorno = "Entrada 3"; // Entrada 3
                break;
            case 6:
                retorno = "Saída 3"; // Saída 3
                break;
            case 7:
                retorno = "Entrada 4"; // Entrada 4
                break;
            case 8:
                retorno = "Saída 4"; // Saída 4
                break;
            case 9:
                retorno = "Entrada 5"; // Entrada 5
                break;
            case 10:
                retorno = "Saída 5"; // Saída 5
                break;
            case 11:
                retorno = "Entrada 6"; // Entrada 6
                break;
            case 12:
                retorno = "Saída 6"; // Saída 6
                break;
            case 13:
                retorno = "Entrada 7"; // Entrada 7
                break;
            case 14:
                retorno = "Saída 7"; // Saída 7
                break;
            case 15:
                retorno = "Entrada 8"; // Entrada 8
                break;
            default:
                retorno = "Saída 8"; // Saída 8
                break;
        }
        return retorno;
    }
    // Função que retorna a sigla do tipo de movimento
    static retornarSiglaTipoMovimento(movimento) {
        var sigla;
        switch(movimento) {
            case 1:
                sigla = "E1"; // Entrada 1
                break;
            case 2:
                sigla = "S1"; // Saída 1
                break;
            case 3:
                sigla = "E2"; // Entrada 2
                break;
            case 4:
                sigla = "S2"; // Saída 2
                break;
            case 5:
                sigla = "E3"; // Entrada 3
                break;
            case 6:
                sigla = "S3"; // Saída 3
                break;
            case 7:
                sigla = "E4"; // Entrada 4
                break;
            case 8:
                sigla = "S4"; // Saída 4
                break;
            case 9:
                sigla = "E5"; // Entrada 5
                break;
            case 10:
                sigla = "S5"; // Saída 5
                break;
            case 11:
                sigla = "E6"; // Entrada 6
                break;
            case 12:
                sigla = "S6"; // Saída 6
                break;
            case 13:
                sigla = "E7"; // Entrada 7
                break;
            case 14:
                sigla = "S7"; // Saída 7
                break;
            case 15:
                sigla = "E8"; // Entrada 8
                break;
            case 16:
                sigla = "S8"; // Saída 8
                break;
          }
          return sigla;
    }
    // retorna se é administrador geral ou não
    static admGeral() {
        return store.state.currentUser.perfil.tipoPerfilServidorChave === "AdministradorGeral" ? false : true;
    }
    // retorna o id do usuário logado
    static tipoUsuario() {
        return store.state.currentUser.perfil.id;
    }
    static traduzirPaginacao() {
        //função que faz um replace no texto da páginação
        setTimeout(() => {
            let pg = document.getElementsByClassName('v-datatable__actions__pagination');
            let p = pg[0];
            p.setAttribute('data-paginacao', p.innerHTML.replace("of", "de"));
            p.addEventListener("DOMCharacterDataModified", function (event) {
              p.setAttribute('data-paginacao', p.innerHTML.replace("of", "de"));
            }, false);
          }, 800);
    }
    // cabeçalho de Perfil com funcionalidades e permissões
    static headerPerfil() {
        return [
            {
                text: 'Funcionalidade',
                sortable: false,
            },
            {
                text: 'Consulta',
                sortable: false,
            },
            {
                text: 'Inclusão',
                sortable: false,
            },
            {
                text: 'Alteração',
                sortable: false,
            },
            {
                text: 'Exclusão',
                sortable: false,
            },
        ]
    }

    static getFuncionalidadesOBJ(item, chave = null) {
        try {
            // usuário logado
            let currentRouter = item.$router.history.current;
            // perfis do usuário logado
            let perfisUsuario = store.state.currentUser.perfis;
            // tipos de permissão que o usuário pode ter
            let permissao = {
                alteracao: false,
                consulta: false,
                exclusao: false,
                inclusao: false,
            }

            let listaPerfilFuncionalidade = [];

            perfisUsuario.map( perfil => {
                let pf = perfil.perfilFuncionalidade.filter((item) => {
                    if (chave !== null) return item.funcionalidade.chave === chave;
                    return currentRouter.meta.requireRoles.includes(item.funcionalidade.chave);
                });
                if (pf.length) {
                    let unificacao = listaPerfilFuncionalidade.concat(pf);
                    listaPerfilFuncionalidade = unificacao;
                }
            });

            // atribui as permissões que o usuário tem
            listaPerfilFuncionalidade.map(perfilFuncionalidade => {
                if (perfilFuncionalidade.alteracao) permissao.alteracao = true;
                if (perfilFuncionalidade.consulta) permissao.consulta = true;
                if (perfilFuncionalidade.exclusao) permissao.exclusao = true;
                if (perfilFuncionalidade.inclusao) permissao.inclusao = true;
            });

            return permissao;
        } catch(e) {
            console.log(e);
        }
    }
    // método que limpa todo o LocalStorage
    static LimparLocalStorage() {
        return localStorage.clear();
    }
    // método que limpa os itens dos filtros das páginas
    // Servidores, Informações Gerenciais e Validar Frequência
    static RemoverItensLocalStorage() {
        // Filtro da página Servidores
        localStorage.removeItem('queryParam');

        // Filtros da página Informações Gerenciais
        localStorage.removeItem('queryParametro');
        localStorage.removeItem('dataInicio');
        localStorage.removeItem('dataFim');
        localStorage.removeItem('situacaoFrequenciaSelecionado');

        // Filtro da página Validar Frequência
        localStorage.removeItem('unidade');
        localStorage.removeItem('nomeServidor');
        localStorage.removeItem('tipoPesquisa');
    }
    // monta a lista de meses de acordo com a situação frequência do mês (aberta/fechada/todas)
    static montarMeses(dataInicio, dataFim, listaFechamento, situacaoFrequencia ) {
        let listaAux = [];
        let dataAux = moment(dataInicio);
        let dataAtual = new Date(Date.now());
        let meses = [];

        while (moment(dataAux) <= moment(dataFim)) {
        // Se situaçãoFrequencia for igual a aberta ou fechada
        if (situacaoFrequencia !== 0) {
            // Se situação frequência for igual a aberta
            if (situacaoFrequencia === 1) {
            listaAux = listaFechamento.items.filter(x => moment(x.dataCompetencia).month() === moment(dataAux).month()
                && moment(x.dataCompetencia).year() === moment(dataAux).year()
                && moment(x.dataLimiteAjuste) >= dataAtual);
            // Se situação frequência for igual a fechada
            } else {
                listaAux = listaFechamento.items.filter(x => moment(x.dataCompetencia).month() === moment(dataAux).month()
                && moment(x.dataCompetencia).year() === moment(dataAux).year()
                && moment(x.dataLimiteAjuste) < dataAtual);
            }
        }

        // Se a lista tiver algum elemento
        if (listaAux.length > 0) {//(this.situacaoFrequencia === 1 && listaAux != null && listaAux.dataLimiteAjuste >= Date.now) {
            meses.push(moment(dataAux));
        } else {
            // Se o usuário não escolher nada no filtro de situação frequencia
            // da página de Informações gerenciais,
            // carregará a lista de registro com todos os meses do período escolhido
            if (situacaoFrequencia === 0) {
                meses.push(moment(dataAux));
            }
        }
            dataAux = moment(dataAux).add(1,"month");
        }

        return meses;
    }
}
