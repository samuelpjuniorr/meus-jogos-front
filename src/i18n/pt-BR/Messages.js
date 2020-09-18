export default {
  internalError: 'Ocorreu um erro interno, contate o administrador do sistema',
  notFound: 'Nenhum registro encontrado',
  notAuthorized: 'Você não tem acesso a esta funcionalidade.',
  searchError: 'Não foi possível realizar a busca.',
  saveSuccess: 'Registro salvo com sucesso.',
  operationSuccess: 'Operação realizada com sucesso.',
  operationError: 'Erro ao realizar a operação',
  saveError: 'Erro ao tentar salvar o registro.',
  removeSuccess: 'Remoção realizada com sucesso.',
  removeError: 'Erro ao tentar remover o registro.',
  resourceNotFoundError: 'Recurso não encontrado',
  notNullError: 'Todos os campos obrigatórios devem ser preenchidos.',
  duplicatedResourceError: 'Já existe um recurso com essas informações.',
  validate: {
    fieldRequired: 'O campo {field} é obrigratório.',
  },
  layout: {
    error404: 'Página não encontrada',
  },
  login: {
    logoutInactive: 'Você foi deslogado do sistema por inatividade. Favor entrar no sistema novamente.',
    invalidCredentials: 'Credenciais Inválidas',
    unknownError: `Não foi possível realizar o login. Tente novamente.
      Caso não consiga favor encontrar em contato com o administrador do sistema.`,
    userNotFound: 'Não foi possível encontrar seus dados',
  },
  home: {
    welcome: 'Seja bem Vindo {userName}',
    description: 'Utilize o menu para navegação.',
  },
  password: {
    resetError: 'Não foi possível reiniciar sua senha.',
  },
  mail: {
    mailErrors: 'Ocorreu um erro nos seguintes emails abaixo:\n',
    sendMailSuccess: 'Email enviado com sucesso!',
    passwordSendingError: 'Não foi possível enviar o email.',
    passwordSendingSuccess: `O processo de recuperação de senha foi iniciado. Caso o email não chegue em
      10 minutos tente novamente.`,
  },
  user: {
    removeYourSelfError: 'Você não pode remover seu próprio usuário',
    userExists: 'Usuário já adicionado!',
    profile: {
      updateError: 'Não foi possível atualizar seu profile',
    },
  },
  queryDinamic: {
    noFilter: 'Nenhum filtro adicionado',
  },
  foreignKeyError: 'Não foi possível remover o registro pois ele possui outros relacionamentos.',
  withoutUserPermission: 'Você não tem permissão para realizar a operação.',
  recoveryPassword: {
    sendMailSuccess: 'O link para redefinição de senha foi enviado para seu email.',
  },
  clockIn: {
    success: 'Ponto registrado com sucesso',
  },
  validation: {
    required: 'Campo obrigatório',
  },
};
