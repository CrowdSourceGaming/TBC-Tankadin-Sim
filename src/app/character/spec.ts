import { ItemStats } from "../item/item-stats";

import { JsonProperty, Serializable } from 'typescript-json-serializer';

@Serializable()
export class Spec {

  @JsonProperty() talents!: TalentMap;
  @JsonProperty() talentString: string;

  constructor(talentAllocation: string = '0000000000000000000000000000000000000000000000000000000000000000') {
    this.initTalents(talentAllocation);
    this.talentString = talentAllocation;
  }

  getMultipliers(): ItemStats {
    return {
      strength: this.talents.divineStrength * 0.02,
      stamina: this.stamMultiplier,
      intellect: this.talents.divineIntellect * 0.02,
      armor: this.talents.toughness * 0.02,
      blockValue: this.talents.shieldSpecialization * 0.1
    }
  }

  getValues(): ItemStats {
    return {
      meleeHitPercent: this.talents.precision,
      spellHitPercent: this.talents.precision,
      meleeExpertise: this.talents.combatExpertise,
      defenseValue: this.talents.anticipation * 4,
      parryValue: this.talents.defection
    }
  }

  get holyProtRetCount(): string {
    const specStringArray = this.talentString.split('')
    const holyCount = specStringArray.slice(0, 20).reduce((a, b) => +a + +b, 0);
    const protCount = specStringArray.slice(20, 42).reduce((a, b) => +a + +b, 0);
    const retCount = specStringArray.slice(42, -1).reduce((a, b) => +a + +b, 0);
    return `${holyCount}/${protCount}/${retCount}`
  }

  private get stamMultiplier(): number {
    const sacredDutyBonus = 0.03;
    const combatExpertiseBonus = 0.02
    return (sacredDutyBonus * this.talents.sacredDuty) + (combatExpertiseBonus * this.talents.combatExpertise);
  }

  private initTalents(talentAllocation: string) {
    const digits = talentAllocation.split('');
    this.talents = {
      // holy
      divineStrength: +digits[0],
      divineIntellect: +digits[1],
      spiritualFocus: +digits[2],
      improvedSoR: +digits[3],
      healingLight: +digits[4],
      auraMastery: +digits[5],
      improvedLoH: +digits[6],
      unyieldingFaith: +digits[7],
      illumination: +digits[8],
      improvedBoW: +digits[9],
      pureOfHeart: +digits[10],
      divineFavor: +digits[11],
      sanctifiedLight: +digits[12],
      purifyingPower: +digits[13],
      holyPower: +digits[14],
      lightsGrace: +digits[15],
      holyShock: +digits[16],
      blessedLife: +digits[17],
      holyGuidance: +digits[18],
      divineIllumination: +digits[19],
      // prot
      improvedDevoAura: +digits[20],
      redoubt: +digits[21],
      precision: +digits[22],
      guardiansFavor: +digits[23],
      toughness: +digits[24],
      blessingOfKings: +digits[25],
      improvedRighteousFury: +digits[26],
      shieldSpecialization: +digits[27],
      anticipation: +digits[28],
      stoicism: +digits[29],
      improvedHoJ: +digits[30],
      improvedConcAura: +digits[31],
      spellWarding: +digits[32],
      blessingOfSanctuary: +digits[33],
      reckoning: +digits[34],
      sacredDuty: +digits[35],
      oneHandedSpec: +digits[36],
      improvedHolyShield: +digits[37],
      holyShield: +digits[38],
      ardentDefender: +digits[39],
      combatExpertise: +digits[40],
      AvengersShield: +digits[41],
      // ret
      improvedBoM: +digits[42],
      benediction: +digits[43],
      impJudgement: +digits[44],
      improvedSoC: +digits[45],
      defection: +digits[46],
      vindication: +digits[47],
      conviction: +digits[48],
      sealOfCommand: +digits[49],
      pursuitOfJustice: +digits[50],
      eyeForAnEye: +digits[51],
      improvedRetAura: +digits[52],
      crusade: +digits[53],
      twoHandedSpec: +digits[54],
      sanctityAura: +digits[55],
      imporovedSanctityAura: +digits[56],
      vengeance: +digits[57],
      sanctifiedJudgement: +digits[58],
      sanctifiedSeals: +digits[59],
      repentance: +digits[60],
      divinePurpose: +digits[61],
      fanaticism: +digits[62],
      crusaderStrike: +digits[63]
    };
  }
}

export interface TalentMap {
  // holy
  divineStrength: number,
  divineIntellect: number,
  spiritualFocus: number,
  improvedSoR: number,
  healingLight: number,
  auraMastery: number,
  improvedLoH: number,
  unyieldingFaith: number,
  illumination: number,
  improvedBoW: number,
  pureOfHeart: number,
  divineFavor: number,
  sanctifiedLight: number,
  purifyingPower: number,
  holyPower: number,
  lightsGrace: number,
  holyShock: number,
  blessedLife: number,
  holyGuidance: number,
  divineIllumination: number,
  // prot
  improvedDevoAura: number,
  redoubt: number,
  precision: number,
  guardiansFavor: number,
  toughness: number,
  blessingOfKings: number,
  improvedRighteousFury: number,
  shieldSpecialization: number,
  anticipation: number,
  stoicism: number,
  improvedHoJ: number,
  improvedConcAura: number,
  spellWarding: number,
  blessingOfSanctuary: number,
  reckoning: number,
  sacredDuty: number,
  oneHandedSpec: number,
  improvedHolyShield: number,
  holyShield: number,
  ardentDefender: number,
  combatExpertise: number,
  AvengersShield: number,
  // ret
  improvedBoM: number,
  benediction: number,
  impJudgement: number,
  improvedSoC: number,
  defection: number,
  vindication: number,
  conviction: number,
  sealOfCommand: number,
  pursuitOfJustice: number,
  eyeForAnEye: number,
  improvedRetAura: number,
  crusade: number,
  twoHandedSpec: number,
  sanctityAura: number,
  imporovedSanctityAura: number,
  vengeance: number,
  sanctifiedJudgement: number,
  sanctifiedSeals: number,
  repentance: number,
  divinePurpose: number,
  fanaticism: number,
  crusaderStrike: number
}
