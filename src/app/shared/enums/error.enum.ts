export enum TypeError {
  NOT_AUTH = 'NOT_AUTH - Não autorizado',
  NOT_FOUND = 'NOT_FOUND - Não encontrado',
  COMPLETED = 'COMPLETED - ação já realizada',
  // Authentication
  AUTH001= 'AUTH001 - Usuário já registrado',
  // PROFILE
  PRO001 = 'PRO001 - Perfil perfil não encontrado',
  PRO002 = 'PRO002 - Perfil desse usuário já cadastrado ou token inválido',
  PRO003 = 'PRO003 - Perfil desse usuário não encontrado',
  PDT001 = 'PDT001 - Detalhes não encontrado',
  // CATEGORY
  CAT001 = 'CAT001 - Categoria com esse nome já existe',
  CAT002 = 'CAT002 - Categoria não encontrada',
  // BRAND
  BRD001 = 'BRD001 - Marca com esse nome já existe',
  BRD002 = 'BRD002 - Existem uma ou mais produtos com essa marca',
  BRD003 = 'BRD003 - Marca não encontrada',
  PRD001 = 'PRD001 - Produto não encontrado',
  PRD002 = 'PRD002 - Produto com esse modelo já existente',
  ADR001 = 'ADR001 - Endereço não encontrado',
  ADR002 = 'ADR002 - Você não pode fazer isso',
  STK001 = 'STK001 - Stock não encontrado',
  USR001 = 'USR001 - Usuário não encontrado',
  USR002 = 'USR002 - Você não pode fazer isso',
  SCT001 = 'SCT001 - Já existe sub categoria com este nome',
  SCT002 = 'SCT002 - Sub categoria não encontrada'
}

export const mapErrorResponse = new Map<TypeError, string>([
  [TypeError.NOT_AUTH, 'NOT_AUTH - Não autorizado'],
  [TypeError.NOT_FOUND, 'NOT_FOUND - Não encontrado'],
  [TypeError.COMPLETED, 'COMPLETED - ação já realizada'],
  // Authentication
  [TypeError.AUTH001, 'Já existe um usuário cadastrado com esses dados (email ou cpf).'],
  // PROFILE
  [TypeError.PRO001, 'PRO001 - Perfil perfil não encontrado'],
  [TypeError.PRO002, 'PRO002 - Perfil desse usuário já cadastrado ou token inválido'],
  [TypeError.PRO003, 'PRO003 - Perfil desse usuário não encontrado'],
  [TypeError.PDT001, 'PDT001 - Detalhes não encontrado'],
  // CATEGORY
  [TypeError.CAT001, 'CAT001 - Categoria com esse nome já existe'],
  [TypeError.CAT002, 'CAT002 - Categoria não encontrada'],
  // BRAND
  [TypeError.BRD001, 'BRD001 - Marca com esse nome já existe'],
  [TypeError.BRD002, 'BRD002 - Existem uma ou mais produtos com essa marca'],
  [TypeError.BRD003, 'BRD003 - Marca não encontrada'],
  [TypeError.PRD001, 'PRD001 - Produto não encontrado'],
  [TypeError.PRD002, 'PRD002 - Produto com esse modelo já existente'],
  [TypeError.ADR001, 'ADR001 - Endereço não encontrado'],
  [TypeError.ADR002, 'ADR002 - Você não pode fazer isso'],
  [TypeError.STK001, 'STK001 - Stock não encontrado'],
  [TypeError.USR001, 'USR001 - Usuário não encontrado'],
  [TypeError.USR002, 'USR002 - Você não pode fazer isso'],
  [TypeError.SCT001, 'Já existe sub categoria com este nome'],
  [TypeError.SCT002, 'SCT002 - Sub categoria não encontrada']
]);

export const arrayErros = [
  'NOT_AUTH - Não autorizado',
  'NOT_FOUND - Não encontrado',
  'COMPLETED - ação já realizada',
  // Authentication
  'AUTH001 - Usuário já registrado',
  // PROFILE
   'PRO001 - Perfil perfil não encontrado',
   'PRO002 - Perfil desse usuário já cadastrado ou token inválido',
   'PRO003 - Perfil desse usuário não encontrado',
   'PDT001 - Detalhes não encontrado',
  // CATEGORY
   'CAT001 - Categoria com esse nome já existe',
   'CAT002 - Categoria não encontrada',
  // BRAND
   'BRD001 - Marca com esse nome já existe',
   'BRD002 - Existem uma ou mais produtos com essa marca',
   'BRD003 - Marca não encontrada',
   'PRD001 - Produto não encontrado',
   'PRD002 - Produto com esse modelo já existente',
   'ADR001 - Endereço não encontrado',
   'ADR002 - Você não pode fazer isso',
   'STK001 - Stock não encontrado',
   'USR001 - Usuário não encontrado',
   'USR002 - Você não pode fazer isso',
   'SCT001 - Já existe sub categoria com este nome',
   'SCT002 - Sub categoria não encontrada'
];
