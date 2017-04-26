import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { roll, DieResult } from './die';

@Component({
  selector: 'die-panel',
  templateUrl: './die-panel.component.html',
  styleUrls: ['./die-panel.component.scss']
})
export class DiePanelComponent {

  @Input() sides: string[][];
  @Input() label: string;
  @Input() control$: Observable<{type: string, e: MouseEvent}>;
  @Output() rolled = new EventEmitter<DieResult[]>();
  value$: Observable<DieResult[]>;
  maxValue = 10;
  minValue = 0;

  roll$: Observable<MouseEvent>;

  private countValues = new Subject<number>();
  private unsubscribe;
  controls = new Subject<number>();
  count$: Observable<number>;

  controlClick(v) {
    this.controls.next(v);
  }

  ngOnInit() {
    this.roll$ = this.control$
    .filter(v => v.type === 'roll')
    // .do(v => console.log(v))
    .map(v => v.e);

    this.control$.filter(v => v.type === 'reset')
    .subscribe(v => this.controls.next(0));

    this.count$ = this.controls.asObservable()
    .scan((current, value) => {
      if (value === 0) {
        return this.minValue;
      } else {
        return Math.min(this.maxValue, Math.max(this.minValue, current + value));
      }
    }, this.minValue)
    .distinctUntilChanged()
    .share()
    .startWith(this.minValue);

    this.value$ = Observable.combineLatest(
      this.count$,
      this.roll$
    ).distinctUntilChanged((x, y) => x[1] === y[1])
    .filter(v => v[0] > 0)
    .map(v => new Array(v[0]).fill(0).map(() => ({ dieType: this.label, face: roll(this.sides) }) ));

    this.unsubscribe = this.value$
    .subscribe(v => this.rolled.emit(v));
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
