import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimComponent } from './sim/sim.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [SimComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgxChartsModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
})
export class SimModule { }
