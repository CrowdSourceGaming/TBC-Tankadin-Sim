export interface ItemStats {
  //raw stats
  stamina?: number,
  intellect?: number,
  strength?: number,
  agility?: number,
  spirit?: number,
  //defensive
  armor?: number,
  //melee
  meleeHit?: number,
  meleeCrit?: number,
  expertise?: number,
  attackRating?: number,
  meleeExpertise?: number,
  //spell
  spellHit?: number,
  spellCrit?: number,
  spellDamage?: number,
  healing?: number,
  spellPen?: number,
  mp5?: number,
}

export enum ItemType {
  unkown = 'unknown',
  mainHand = 'mainHand',
  offHand = 'offHand',
  oneHand = 'oneHand',
  shield = 'shield',
  head = 'head'
}
