import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatsTotalsComponent } from './stats-totals/stats-totals.component';
import { GearSlotComponent } from './gear-slot/gear-slot.component';
import { MatTabsModule } from '@angular/material/tabs';
import { GearSelectorComponent } from './gear-selector/gear-selector.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    StatsTotalsComponent,
    GearSlotComponent,
    GearSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
