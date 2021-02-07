import { ItemStats } from "../item-stats"

export enum Races {
  bloodElf = "Blood Elf",
  draeni = 'Draeni',
  dwarf = 'Dwarf',
  human = 'Human'
}


const raceAttributeValues: { [key in Races]: ItemStats } = {
  [Races.bloodElf]: { strength: 19, agility: 22, stamina: 22, intellect: 23, spirit: 19 },
  [Races.draeni]: { strength: 23, agility: 17, stamina: 22, intellect: 20, spirit: 23 },
  [Races.dwarf]: { strength: 27, agility: 16, stamina: 23, intellect: 19, spirit: 20 },
  [Races.human]: { strength: 22, agility: 20, stamina: 22, intellect: 20, spirit: 21 }
}

export const getRaceAttributeValues = (race: Races): ItemStats => {
  return raceAttributeValues[race];
}
