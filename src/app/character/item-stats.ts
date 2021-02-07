export interface ItemStats {
  //raw stats
  [ItemStatsEnum.stamina]?: number,
  [ItemStatsEnum.intellect]?: number,
  [ItemStatsEnum.strength]?: number,
  [ItemStatsEnum.agility]?: number,
  [ItemStatsEnum.spirit]?: number,
  //defensive
  [ItemStatsEnum.armor]?: number,
  [ItemStatsEnum.defenseRating]?: number,
  [ItemStatsEnum.miss]?: number,
  [ItemStatsEnum.dodgeRating]?: number,
  [ItemStatsEnum.parryRating]?: number,
  [ItemStatsEnum.blockRating]?: number,
  [ItemStatsEnum.blockValue]?: number,
  //melee
  [ItemStatsEnum.meleeHitRating]?: number,
  [ItemStatsEnum.meleeCritRating]?: number,
  [ItemStatsEnum.expertiseRating]?: number,
  [ItemStatsEnum.attackRating]?: number,
  [ItemStatsEnum.meleeExpertise]?: number,
  [ItemStatsEnum.attackPower]?: number,
  [ItemStatsEnum.damage]?: number,
  [ItemStatsEnum.hasteRating]?: number,
  [ItemStatsEnum.armorPenRating]?: number,

  //spell
  [ItemStatsEnum.spellHitRating]?: number,
  [ItemStatsEnum.spellCritRating]?: number,
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
  defenseRating = 'defenseRating',
  miss = 'miss',
  dodgeRating = 'dodgeRating',
  parryRating = 'parryRating',
  blockRating = 'blockRating',
  blockValue = 'blockValue',
  //melee
  meleeHitRating = 'meleeHit',
  meleeCritRating = 'meleeCrit',
  expertiseRating = 'expertise',
  attackRating = 'attackRating',
  meleeExpertise = 'meleeExpertise',
  attackPower = 'attackPower',
  damage = 'damage',
  hasteRating = 'haste',
  armorPenRating = 'armorPenRating',
  //spell
  spellHitRating = 'spellHit',
  spellCritRating = 'spellCrit',
  spellDamage = 'spellDamage',
  healing = 'healing',
  spellPen = 'spellPen',
  mp5 = 'mp5',
}
