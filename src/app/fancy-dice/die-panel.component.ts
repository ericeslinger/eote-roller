import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PlusMinusComponent } from '../plus-minus/plus-minus.component';
import { roll, DieResult } from './die';

@Component({
  selector: 'die-panel',
  templateUrl: './die-panel.component.html',
  styleUrls: ['./die-panel.component.scss']
})
export class DiePanelComponent {

  @Input() sides: string[][];
  @Input() label: string;
  @Input() roll$: Observable<MouseEvent>;
  @Output() rolled = new EventEmitter<DieResult[]>();
  value$: Observable<DieResult[]>;

  private countValues = new Subject<number>();
  private unsubscribe;

  onCount(c) {
    this.countValues.next(c);
  }

  ngOnInit() {
    this.value$ = Observable.combineLatest(
      this.countValues.asObservable(),
      this.roll$
    ).distinctUntilChanged((x, y) => x[1] === y[1])
    .filter(v => v[0] > 0)
    .map(v => new Array(v[0]).fill(0).map(() => ({ dieType: this.label, face: roll(this.sides) }) ))
    .share();
    this.unsubscribe = this.value$
    .subscribe(v => this.rolled.emit(v));
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
