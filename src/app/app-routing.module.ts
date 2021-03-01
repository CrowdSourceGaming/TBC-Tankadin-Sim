import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterConfigComponent } from './character-config/character-config.component';
import { GearSlotComponent } from './gear-slot/gear-slot.component';
import { SimComponent } from './sim/sim/sim.component';

const routes: Routes = [
  { path: 'gear/:slot', component: GearSlotComponent },
  { path: 'gear', component: GearSlotComponent },
  { path: 'character', component: CharacterConfigComponent },
  { path: '', redirectTo: 'gear', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
