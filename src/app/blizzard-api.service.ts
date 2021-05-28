import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Item, WeaponType } from './item/item';
import { ItemStats, ItemStatsEnum } from './item/item-stats';
import { GearSlots } from './character/gearslot';


const blizzardApiUrl = 'https://us.api.blizzard.com/'

@Injectable({
  providedIn: 'root'
})
export class BlizzardApiService {

  blizzardAccessToken: string | null = null;

  constructor(private httpClient: HttpClient) {
    if (!this.blizzardAccessToken) {
      this.login().subscribe(token => {
        this.blizzardAccessToken = 'Bearer ' + token.access_token;
      })
    }
  }

  async getItemInfo(item: Item): Promise<Observable<any>> {
    await this.waitForConnection();
    return this.httpClient.get<ItemResponse>(blizzardApiUrl + `data/wow/item/${item.id}`, { headers: this.assembleHeaders(), params: this.assembleParams() }).pipe(
      map(res => {
        item.id = res.id;
        item._id = res.id;
        item.name = res.name;
        item.unique = res.preview_item.unique_equipped === 'Unique'
        item.validSlot = this.convertSlot(res.inventory_type.type);
        item.stats.armor = (res.preview_item.armor?.value || 0);
        res.preview_item.spells.forEach(async spell => {
          // const spellResponse = await this.lookupSpell(spell.spell.key.href);
          const spellResponse = this.convertSpell(spell.description);
          const valueMatch = spell.description.match(/\d+/)
          const value = valueMatch ? valueMatch[0] : 0;
          item.stats[spellResponse as keyof typeof ItemStatsEnum] = +value;
        })
        res.preview_item.stats.forEach(apiStat => {
          const stat = this.convertApiStatToAppStat(apiStat.type.type)
          item.stats[stat as keyof typeof ItemStatsEnum] = apiStat.value;
        })

        item.stats.blockValue = (item.stats.blockValue || 0) + (res.preview_item.shield_block?.value || 0)

        //weapon
        if (item.validSlot === GearSlots.mainHand) {
          item.weaponType = this.convertWeaponType(res.item_subclass.name)
          item.stats.damageMin = res.preview_item.weapon?.damage.min_value;
          item.stats.damageMax = res.preview_item.weapon?.damage.max_value;
          item.stats.attackSpeed = (res.preview_item.weapon?.attack_speed.value || 0) / 1000
        }
        return item
      })
    )
  }

  async getItemMediaURL(itemId: number): Promise<Observable<string>> {
    await this.waitForConnection();
    return this.httpClient.get<ItemMediaResponse>(blizzardApiUrl + `data/wow/media/item/${itemId}`, { headers: this.assembleHeaders(), params: this.assembleParams() }).pipe(
      map(r => {
        const foundRecord = r.assets.find(asset => asset.key === 'icon')?.value
        return foundRecord || '';
      })
    )
  }


  private login(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${environment.blizzardAPICreds.clientId}:${environment.blizzardAPICreds.clientSecret}`)
    })

    return this.httpClient.post('https://us.battle.net/oauth/token?grant_type=client_credentials', '', { headers })
  }


  private assembleHeaders() {
    return new HttpHeaders({ 'Authorization': this.blizzardAccessToken! });
  }

  private assembleParams() {
    return new HttpParams({ fromObject: { namespace: 'static-classic-us', locale: 'en_US' } });
  }

  private async waitForConnection() {
    while (!this.blizzardAccessToken) {
      await this.sleep(100);
    }
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async lookupSpell(spellURL: string) {
    await this.httpClient.get(spellURL, { headers: this.assembleHeaders() }).toPromise()
  }

  private convertWeaponType(weaponType: string): WeaponType {
    const conversion = {
      Sword: WeaponType.oneHandedSword,
      Mace: WeaponType.oneHandedMace,
      Axe: WeaponType.oneHandedAxe
    }
    return conversion[weaponType as keyof typeof conversion]
  }

  private convertSlot(slot: string): GearSlots {
    const conversion = {
      WEAPONMAINHAND: GearSlots.mainHand,
      WEAPONONEHAND: GearSlots.mainHand,
      WEAPON: GearSlots.mainHand,
      HEAD: GearSlots.head,
      NECK: GearSlots.neck,
      SHOULDER: GearSlots.shoulder,
      CLOAK: GearSlots.back,
      BACK: GearSlots.back,
      CHEST: GearSlots.chest,
      WRIST: GearSlots.wrist,
      HAND: GearSlots.hands,
      WAIST: GearSlots.waist,
      LEGS: GearSlots.legs,
      FEET: GearSlots.feet,
      FINGER: GearSlots.fingerOne,
      TRINKET: GearSlots.trinketOne,
      SHIELD: GearSlots.offHand,
      RELIC: GearSlots.relic
    }

    return conversion[slot as keyof typeof conversion];
  }

  private convertSpell(spellDescription: string): ItemStatsEnum | void {
    const conversion = {
      "block rating by": ItemStatsEnum.blockRating,
      "block value of your shield": ItemStatsEnum.blockValue,
      "Increases damage and healing done by magical spells and effects by up to": ItemStatsEnum.spellDamage,
      "Increases healing done": ItemStatsEnum.healing,
      "Increases your critical strike rating by": ItemStatsEnum.meleeCritRating,
      "Increases your hit rating by": ItemStatsEnum.meleeHitRating,
      "Increases attack power by": ItemStatsEnum.attackPower,
      "Increases your parry rating by": ItemStatsEnum.parryRating,
      "mana per 5 sec": ItemStatsEnum.mp5
    }

    for (let key of Object.keys(conversion)) {
      if (spellDescription.includes(key)) {
        return conversion[key as keyof typeof conversion];
      }
    }
  }

  private convertWeaponStats(statName: string): ItemStatsEnum | void {
    const conversion = {
      min_value: ItemStatsEnum.damageMin,
      max_value: ItemStatsEnum.damageMax,
      attack_speed: ItemStatsEnum.attackSpeed
    }
    return conversion[statName as keyof typeof conversion]
  }

  private convertApiStatToAppStat(statName: string): ItemStatsEnum | void {
    const conversionTable = {
      STAMINA: ItemStatsEnum.stamina,
      INTELLECT: ItemStatsEnum.intellect,
      DEFENSE_SKILL_RATING: ItemStatsEnum.defenseRating,
      DODGE_RATING: ItemStatsEnum.dodgeRating,
      STRENGTH: ItemStatsEnum.strength,
      SPIRIT: ItemStatsEnum.spirit,
      AGILITY: ItemStatsEnum.agility,
      PARRY_RATING: ItemStatsEnum.parryRating,
      HIT_RATING: ItemStatsEnum.meleeHitRating,
      HIT_SPELL_RATING: ItemStatsEnum.spellHitRating,
      CRIT_SPELL_RATING: ItemStatsEnum.spellCritRating,
      RESILIENCE_RATING: ItemStatsEnum.resilience,
      EXPERTISE_RATING: ItemStatsEnum.expertiseRating


      /* COMPLETED */
      // [ItemStatsEnum.stamina]?: number,
      // [ItemStatsEnum.intellect]?: number,
      // [ItemStatsEnum.defenseRating]?: number,
      // [ItemStatsEnum.dodgeRating]?: number,
      // [ItemStatsEnum.strength]?: number,
      // [ItemStatsEnum.spirit]?: number,
      // [ItemStatsEnum.agility]?: number,
      // [ItemStatsEnum.parryRating]?: number,
      // [ItemStatsEnum.blockRating]?: number,
      // [ItemStatsEnum.blockValue]?: number,
      // [ItemStatsEnum.spellDamage]?: number,
      // [ItemStatsEnum.meleeHitRating]?: number,
      // [ItemStatsEnum.attackSpeed]?: number,
      // [ItemStatsEnum.damageMax]?: number,
      // [ItemStatsEnum.damageMin]?: number,
      // [ItemStatsEnum.spellHitRating]?: number,
      // [ItemStatsEnum.healing]?: number,
      // [ItemStatsEnum.armor]?: number,
      // [ItemStatsEnum.spellCritRating]?: number,
      // [ItemStatsEnum.resilience]?: number,
      // [ItemStatsEnum.meleeCritRating]?: number,
      // [ItemStatsEnum.attackPower]?: number,
      // [ItemStatsEnum.mp5]?: number,



      /* TODO:  */
      // //defensive
      // [ItemStatsEnum.miss]?: number,


      // //melee
      // [ItemStatsEnum.meleeCritDamagePercent]?: number,
      // [ItemStatsEnum.hasteRating]?: number,
      // [ItemStatsEnum.armorPenRating]?: number,


      // //spell


      // [ItemStatsEnum.spellHasteRating]?: number,
      // [ItemStatsEnum.spellPen]?: number,
    }
    const conversion: ItemStatsEnum = conversionTable[statName as keyof typeof conversionTable];
    if (!conversion) {
      console.error('unkown stat conversion: ', statName)
    } else {
      return conversion;
    }
  }
}

export interface ItemResponse {
  id: number,
  name: string,
  inventory_type: {
    type: string,
    name: string
  },
  item_class: {
    name: string
    id: number
  },
  item_subclass: {
    key: {
      href: string
    },
    name: string,
    id: number
  },
  preview_item: {
    armor: {
      value: number
    },
    unique_equipped: string,
    weapon?: {
      damage: {
        min_value: number,
        max_value: number
      }
      attack_speed: {
        value: number
      },
    },
    spells: [
      {
        spell: {
          key: {
            href: string
          },
          name: string,
          id: number,
        },
        description: string
      }
    ],
    shield_block?:{
      value: number
    }
    stats: [
      {
        type: {
          type: string
        },
        value: number
      }
    ]
  },


}

const item_classes = [
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/0?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Consumable",
    "id": 0
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/1?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Container",
    "id": 1
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/2?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Weapon",
    "id": 2
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/3?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Gem",
    "id": 3
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/4?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Armor",
    "id": 4
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/5?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Reagent",
    "id": 5
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/6?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Projectile",
    "id": 6
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/7?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Trade Goods",
    "id": 7
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/9?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Recipe",
    "id": 9
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/11?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Quiver",
    "id": 11
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/12?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Quest",
    "id": 12
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/13?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Key",
    "id": 13
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/15?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "Miscellaneous",
    "id": 15
  },
  {
    "key": {
      "href": "https://us.api.blizzard.com/data/wow/item-class/18?namespace=static-2.5.1_38644-classic-us"
    },
    "name": "WoW Token",
    "id": 18
  }
]

export interface ItemMediaResponse {
  _links: {
    self: {
      href: string
    }
  },
  assets: ItemMediaAsset[],
  id: number
}

export interface ItemMediaAsset {
  key: string,
  value: string,
  file_data_id: number
}
