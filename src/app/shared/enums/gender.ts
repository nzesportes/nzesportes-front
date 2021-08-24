
export enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  BOTH = 'BOTH'
}

export const mapGender = new Map<Gender, string>([
  [Gender.FEMALE, 'FEMININO'],
  [Gender.MALE, 'MASCULINO'],
  [Gender.BOTH, 'AMBOS'],
]);
