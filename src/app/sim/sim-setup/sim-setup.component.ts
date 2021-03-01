import { Component, OnInit } from '@angular/core';
import { CombatService } from '../combat.service';

@Component({
  selector: 'app-sim-setup',
  templateUrl: './sim-setup.component.html',
  styleUrls: ['./sim-setup.component.scss']
})
export class SimSetupComponent implements OnInit {

  constructor(private combatService: CombatService) { }

  ngOnInit(): void {
  }

  activeSpell(nameOfSpell: string) {
    return this.combatService.activeAbilities.has(nameOfSpell) ? '' : 'inactive';
  }

  activeBuff(nameOfSpell: string) {
    return this.combatService.activeBuffs.has(nameOfSpell) ? '' : 'inactive';
  }

  activeDebuff(nameOfSpell: string) {
    return this.combatService.activeDebuffs.has(nameOfSpell) ? '' : 'inactive';
  }

  setSeal(nameOfSeal: string) {
    this.combatService.activeAbilities.delete('Seal of Righteousness')
    this.combatService.activeAbilities.delete('Seal of Vengeance')
    this.combatService.activeAbilities.add(nameOfSeal);
  }

  setDebuff(nameOfDebuff: string) {
    if (this.combatService.activeDebuffs.has(nameOfDebuff)) {
      this.combatService.activeDebuffs.delete(nameOfDebuff)
    } else {
      this.combatService.activeDebuffs.add(nameOfDebuff)
    }
  }

  setBuff(nameOfBuff: string){
    if (this.combatService.activeBuffs.has(nameOfBuff)) {
      this.combatService.activeBuffs.delete(nameOfBuff)
    } else {
      this.combatService.activeBuffs.add(nameOfBuff)
    }
  }

  setAvengersShield() {
    if (this.combatService.activeAbilities.has('Avenger\'s Shield')) {
      this.combatService.activeAbilities.delete('Avenger\'s Shield')
    } else {
      this.combatService.activeAbilities.add('Avenger\'s Shield')
    }
  }

  setRetributionAura(rank: number) {
    const activeSpells = this.combatService.activeAbilities.values()
    let done = false;
    let wipeAll = false;
    while (!done) {
      const ability = activeSpells.next()
      if (ability.done) {
        done = true;
      } else {
        const match = ability.value.match(/Retribution Aura - (\d){1}/)
        if (match && match[1]) {
          if (+match[1] === +rank) {
            wipeAll = true;
          }
        }
      }
    }
    this.combatService.activeAbilities.delete('Retribution Aura - 0')
    this.combatService.activeAbilities.delete('Retribution Aura - 1')
    this.combatService.activeAbilities.delete('Retribution Aura - 2')
    if (!wipeAll) {
      this.combatService.activeAbilities.add(`Retribution Aura - ${rank}`)
    }
  }

  setSanctityAura(rank: number) {
    const activeBuffs = this.combatService.activeBuffs.values()
    let done = false;
    let wipeAll = false;
    while (!done) {
      const ability = activeBuffs.next()
      if (ability.done) {
        done = true;
      } else {
        const match = ability.value.match(/Sanctity Aura - (\d){1}/)
        if (match && match[1]) {
          if (+match[1] === +rank) {
            wipeAll = true;
          }
        }
      }
    }
    this.combatService.activeBuffs.delete('Sanctity Aura - 0')
    this.combatService.activeBuffs.delete('Sanctity Aura - 1')
    this.combatService.activeBuffs.delete('Sanctity Aura - 2')
    if (!wipeAll) {
      this.combatService.activeBuffs.add(`Sanctity Aura - ${rank}`)
    }
  }

}
