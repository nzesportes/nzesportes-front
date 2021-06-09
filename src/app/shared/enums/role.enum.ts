export enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_MODERATOR = 'ROLE_MODERATOR',
  ROLE_USER = 'ROLE_USER'
}


export const mapRolesTranslate = new Map<Role, string>([
  [Role.ROLE_ADMIN, 'Administrador'],
  [Role.ROLE_MODERATOR, 'Moderador'],
  [Role.ROLE_USER, 'Usuário comum']
]);
