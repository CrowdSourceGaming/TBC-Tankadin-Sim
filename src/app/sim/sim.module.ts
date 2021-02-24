import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimComponent } from './sim/sim.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SimResultsComponent } from './sim-results/sim-results.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [SimComponent, BarChartComponent, SimResultsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgxChartsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
})
export class SimModule { }
