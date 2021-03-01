export interface AttackTable {
  [AttackTableEnum.miss]: number;
  [AttackTableEnum.dodge]: number;
  [AttackTableEnum.parry]: number;
  [AttackTableEnum.glancing]: number;
  [AttackTableEnum.block]: number;
  [AttackTableEnum.miss]: number;
  [AttackTableEnum.crit]: number;
  [AttackTableEnum.crushing]: number;
  [AttackTableEnum.hit]: number;
}

export enum AttackTableEnum {
  miss = 'miss',
  dodge = 'dodge',
  parry = 'parry',
  glancing = 'glancing',
  block = 'block',
  crit = 'crit',
  crushing = 'crushing',
  hit = 'hit'
}
