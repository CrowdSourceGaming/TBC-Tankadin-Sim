export interface ItemStats {
  stamina?: number,
  intellect?: number,
  strength?: number,
  agility?: number,
  armor?: number,
  spirit?: number,
  meleeHit?: number,
  meleeCrit?: number,
  expertise?: number,
  spellHit?: number,
  spellCrit?: number,
  spellPower?: number,
}

export enum ItemType {
  unkown = 'unknown',
  mainHand = 'mainHand',
  offHand = 'offHand',
  oneHand = 'oneHand',
  shield = 'shield',
  head = 'head'
}
