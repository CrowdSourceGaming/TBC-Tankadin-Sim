export enum DamageType {
  holy = 'holy',
  shadow = 'shadow',
  fire = 'fire',
  arcane = 'arcane',
  physical = 'physical'
}


export type Resistances = {
  [key in DamageType]: string;
}
