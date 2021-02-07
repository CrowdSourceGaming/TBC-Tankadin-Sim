export interface ItemStats {
  //raw stats
  [ItemStatsEnum.stamina]?: number,
  [ItemStatsEnum.intellect]?: number,
  [ItemStatsEnum.strength]?: number,
  [ItemStatsEnum.agility]?: number,
  [ItemStatsEnum.spirit]?: number,
  //defensive
  [ItemStatsEnum.armor]?: number,
  [ItemStatsEnum.defense]?: number,
  [ItemStatsEnum.miss]?: number,
  [ItemStatsEnum.dodge]?: number,
  [ItemStatsEnum.parry]?: number,
  [ItemStatsEnum.block]?: number,
  [ItemStatsEnum.blockValue]?: number,
  //melee
  [ItemStatsEnum.meleeHit]?: number,
  [ItemStatsEnum.meleeCrit]?: number,
  [ItemStatsEnum.expertise]?: number,
  [ItemStatsEnum.attackRating]?: number,
  [ItemStatsEnum.meleeExpertise]?: number,
  [ItemStatsEnum.attackPower]?: number,
  [ItemStatsEnum.damage]?: number,

  //spell
  [ItemStatsEnum.spellHit]?: number,
  [ItemStatsEnum.spellCrit]?: number,
  [ItemStatsEnum.spellDamage]?: number,
  [ItemStatsEnum.healing]?: number,
  [ItemStatsEnum.spellPen]?: number,
  [ItemStatsEnum.mp5]?: number,
}

export enum ItemType {
  unkown = 'unknown',
  mainHand = 'mainHand',
  offHand = 'offHand',
  oneHand = 'oneHand',
  shield = 'shield',
  head = 'head'
}

export enum ItemStatsEnum {
  stamina = 'stamina',
  intellect = 'intellect',
  strength = 'strength',
  agility = 'agility',
  spirit = 'spirit',
  //defensive
  armor = 'armor',
  defense = 'defense',
  miss = 'miss',
  dodge = 'dodge',
  parry = 'parry',
  block = 'block',
  blockValue = 'blockValue',
  //melee
  meleeHit = 'meleeHit',
  meleeCrit = 'meleeCrit',
  expertise = 'expertise',
  attackRating = 'attackRating',
  meleeExpertise = 'meleeExpertise',
  attackPower = 'attackPower',
  damage = 'damage',
  //spell
  spellHit = 'spellHit',
  spellCrit = 'spellCrit',
  spellDamage = 'spellDamage',
  healing = 'healing',
  spellPen = 'spellPen',
  mp5 = 'mp5',
}
