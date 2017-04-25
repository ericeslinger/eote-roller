import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MdButton } from '@angular/material';
import { Observable } from 'rxjs';
import { PlusMinusComponent } from './plus-minus/plus-minus.component';
import { ability } from './fancy-dice/abilityDie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  abilityDie = ability;
  title = 'app works!';
}
