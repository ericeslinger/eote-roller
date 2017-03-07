import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { DiceComponent } from './dice/dice.component';

@NgModule({
  declarations: [
    AppComponent,
    DiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
