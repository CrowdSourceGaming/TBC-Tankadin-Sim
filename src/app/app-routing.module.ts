import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterConfigComponent } from './character-config/character-config.component';
import { GearSlotComponent } from './gear-slot/gear-slot.component';

const routes: Routes = [
  { path: 'gear', component: GearSlotComponent },
  { path: 'character', component: CharacterConfigComponent },
  { path: '', redirectTo: 'gear', pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
