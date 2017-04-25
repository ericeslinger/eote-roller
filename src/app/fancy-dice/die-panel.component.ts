import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MdButton } from '@angular/material';
import { Observable } from 'rxjs';
import { PlusMinusComponent } from '../plus-minus/plus-minus.component';
import { roll } from './die';

@Component({
  selector: 'die-panel',
  templateUrl: './die-panel.component.html',
  styleUrls: ['./die-panel.component.scss']
})
export class DiePanelComponent implements AfterViewInit {

  @ViewChild('pm') plusMinus: PlusMinusComponent;
  @ViewChild('rollButton') rollButton: MdButton;
  @Input() sides: string[][];
  value$: Observable<string[][]>;

  ngAfterViewInit() {
    this.value$ = Observable.combineLatest(
      this.plusMinus.count$,
      Observable.fromEvent<MouseEvent>(this.rollButton._getHostElement(), 'click')
    ).distinctUntilChanged((x, y) => x[1] === y[1])
    .do(v => console.log(v))
    .map(v => new Array(v[0]).fill(0).map(() => roll(this.sides)));
  }

}
