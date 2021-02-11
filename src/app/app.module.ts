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
import { MatSortModule } from '@angular/material/sort';
import { ReferencesComponent } from './references/references.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NewGearComponent } from './new-gear/new-gear.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { NewSpecComponent } from './new-spec/new-spec.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { HumanizePipe } from './humanize.pipe';
import { ControlsComponent } from './controls/controls.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorComponent } from './error/error.component';
import { CharacterConfigComponent } from './character-config/character-config.component';
import { GearAlterationComponent } from './gear-alteration/gear-alteration.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsTotalsComponent,
    GearSlotComponent,
    GearSelectorComponent,
    ReferencesComponent,
    NewGearComponent,
    NewSpecComponent,
    HumanizePipe,
    ControlsComponent,
    ErrorComponent,
    CharacterConfigComponent,
    GearAlterationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: function () {
        const location = window.location.pathname.split('/')[1] || '';
        if (location !== 'gear' && location !== 'character') {
          return `/${location}`
        } else {
          return '/'
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
