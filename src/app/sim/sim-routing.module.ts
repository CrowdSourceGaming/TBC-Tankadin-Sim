import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimComponent } from './sim/sim.component'

const routes: Routes = [
  { path: 'sim', component: SimComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SimRoutingModule { }
